import {take, put, call, select, all} from 'redux-saga/effects';
import {get, includes} from 'lodash';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';
import {getFbAccessToken, getFbUserData, fbLogout} from '../Services/FbService';
import {googleSigninSetup, getGoogleUserData, googleLogout} from '../Services/GoogleService';

function * getToken(api, email, loginToken) {
  const response = yield call(api.getToken, email, loginToken);
  const problem = get(response, 'problem');
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const authToken = get(data, 'auth_token');
    yield put(Actions.getTokenSuccess(email, authToken));
    return authToken;
  } else {
    yield put(Actions.getTokenFailure(statusCode, problem));
    return null;
  }
}

function * apiCall(apiFn, apiParams = {}) {
  const authToken = yield select((state) => state.login.authToken);
  return yield call(apiFn, authToken, apiParams);
}

export function * authSaga(apiFn, apiParams = {}) {
  let response = yield call(apiCall, apiFn, apiParams);
  const statusCode = get(response, 'data.response.code');
  if (statusCode === 401) {
    const {email, loginToken} = yield select((state) => state.loginPersistent);
    if (email && loginToken) {
      yield put(Actions.getToken(email, loginToken));
      const tokenAction = yield take([Types.GET_TOKEN_SUCCESS, Types.GET_TOKEN_FAILURE]);
      if (tokenAction.type === Types.GET_TOKEN_SUCCESS) {
        response = yield call(apiCall, apiFn, apiParams);
      } else if (tokenAction.type === Types.GET_TOKEN_FAILURE) {
        yield put(Actions.logout());
      }
    } else {
      yield put(Actions.logout());
    }
  }
  return response;
}

function* signIn(api, {email, password}) {
  const response = yield call(api.signIn, email, password);
  const problem = get(response, 'problem');
  const data = get(response, 'data');
  let statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const loginToken = get(data, 'login_token');
    yield put(Actions.getToken(email, loginToken));
    const tokenAction = yield take([Types.GET_TOKEN_SUCCESS, Types.GET_TOKEN_FAILURE]);
    if (tokenAction.type === Types.GET_TOKEN_SUCCESS) {
      yield put(Actions.loginSuccess(email, loginToken));
    } else if (tokenAction.type === Types.GET_TOKEN_FAILURE) {
      statusCode = yield select((state) => state.login.tokenErrorCode);
      yield put(Actions.loginFailure(statusCode));
    }
  } else {
    const errors = get(data, 'errors');
    const message = get(data, 'message');
    yield put(Actions.loginFailure(statusCode, errors, message, problem));
  }
}

function* fbSignIn(api) {
  try {
    const fbAccessToken = yield call(getFbAccessToken);
    if (fbAccessToken) {
      const fbUserData = yield call(getFbUserData);
      const {id, email, first_name, last_name} = fbUserData;
      const response = yield call(api.fbSignIn, id, fbAccessToken, first_name, last_name, email);
      const problem = get(response, 'problem');
      const data = get(response, 'data');
      let statusCode = get(data, 'response.code');
      if (statusCode === 200) {
        const loginToken = get(data, 'login_token');
        yield put(Actions.getToken(email, loginToken));
        const tokenAction = yield take([Types.GET_TOKEN_SUCCESS, Types.GET_TOKEN_FAILURE]);
        if (tokenAction.type === Types.GET_TOKEN_SUCCESS) {
          yield put(Actions.fbLoginSuccess(email, loginToken));
        } else if (tokenAction.type === Types.GET_TOKEN_FAILURE) {
          statusCode = yield select((state) => state.login.tokenErrorCode);
          yield put(Actions.fbLoginFailure(statusCode));
        }
      } else {
        const errors = get(data, 'errors');
        const message = get(data, 'message');
        yield put(Actions.fbLoginFailure(statusCode, errors, message, problem));
      }
    }
  }
  catch(error) {
    yield put(Actions.fbLoginFailure(null, null, get(error, 'message')));
  }
}

function* googleSignIn(api) {
  try {
    const googleUserData = yield call(getGoogleUserData);
    const {id, idToken, accessToken, serverAuthCode, givenName, familyName, name, email, photo} = googleUserData;
    const response = yield call(api.googleSignIn, id, idToken, accessToken, serverAuthCode, givenName, familyName, name, email, photo);
    const problem = get(response, 'problem');
    const data = get(response, 'data');
    let statusCode = get(data, 'response.code');
    if (statusCode === 200) {
      const loginToken = get(data, 'login_token');
      yield put(Actions.getToken(email, loginToken));
      const tokenAction = yield take([Types.GET_TOKEN_SUCCESS, Types.GET_TOKEN_FAILURE]);
      if (tokenAction.type === Types.GET_TOKEN_SUCCESS) {
        yield put(Actions.googleLoginSuccess(email, loginToken));
      } else if (tokenAction.type === Types.GET_TOKEN_FAILURE) {
        statusCode = yield select((state) => state.login.tokenErrorCode);
        yield put(Actions.googleLoginFailure(statusCode));
      }
    } else {
      const errors = get(data, 'errors');
      const message = get(data, 'message');
      yield put(Actions.googleLoginFailure(statusCode, errors, message, problem));
    }
  }
  catch(error) {
    const errorCode = get(error, 'code');
    if (includes([-5, 12501], errorCode)) {
      yield put(Actions.googleLoginCancel());
    } else {
      yield put(Actions.googleLoginFailure(errorCode, null, get(error, 'message')));
    }
  }
}

function* googleSignInSetup() {
  try {
    yield call(googleSigninSetup);
    yield put(Actions.googleLoginSetupSuccess());
  }
  catch(error) {
    yield put(Actions.googleLoginSetupFailure(get(error, 'code'), null, get(error, 'message')));
  }
}

function* logout() {
  yield all([
    call(fbLogout),
    call(googleLogout)
  ]);
}

export function * watchGetToken(api) {
  while (true) {
    const {email, loginToken} = yield take(Types.GET_TOKEN);
    yield call(getToken, api, email, loginToken);
  }
}

export function * watchLogout() {
  while (true) {
    yield take(Types.LOGOUT);
    yield call(logout);
  }
}

export function* watchLogin(api) {
  while (true) {
    const {data} = yield take(Types.LOGIN);
    yield call(signIn, api, data);
  }
}

export function* watchFbLogin(api) {
  while (true) {
    yield take(Types.FB_LOGIN);
    yield call(fbSignIn, api);
  }
}

export function* watchGoogleLoginSetup() {
  while (true) {
    yield take(Types.GOOGLE_LOGIN_SETUP);
    yield call(googleSignInSetup);
  }
}

export function* watchGoogleLogin(api) {
  while (true) {
    yield take(Types.GOOGLE_LOGIN);
    yield call(googleSignIn, api);
  }
}