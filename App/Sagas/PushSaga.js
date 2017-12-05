import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import {authSaga} from './AuthSaga';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

function * registerPush(api, pushId) {
  const response = yield call(authSaga, api.registerPush, pushId);
  const data = get(response, 'data');
  const message = get(data, 'message');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(Actions.registerPushSuccess(message));
  } else {
    yield put(Actions.registerPushFailure(statusCode, message));
  }
}

export function * watchRegisterPush(api) {
  while (true) {
    const {pushId} = yield take(Types.REGISTER_PUSH);
    yield call(registerPush, api, pushId);
  }
}