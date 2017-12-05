import {take, put, select, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';
import SplashScreen from '@remobile/react-native-splashscreen';

// process STARTUP actions
export function * watchStartup() {
  yield take(Types.STARTUP);
  yield call(delay, 600);
  yield put(Actions.googleLoginSetup());
  const {email, loginToken} = yield select((state) => state.loginPersistent);
  if (email && loginToken) {
    yield put(Actions.getToken(email, loginToken));
    const tokenAction = yield take([Types.GET_TOKEN_SUCCESS, Types.GET_TOKEN_FAILURE]);
    SplashScreen.hide();    
    yield put(Actions.initialized());
  } else {
    SplashScreen.hide();    
    yield put(Actions.initialized());
  }
}
