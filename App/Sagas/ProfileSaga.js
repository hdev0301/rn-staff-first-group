import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';
import {authSaga} from './AuthSaga';

function * getProfile(api) {
  const response = yield call(authSaga, api.getProfile);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const profile = get(data, 'result');
    yield put(Actions.getProfileSuccess(profile));
  } else {
    yield put(Actions.getProfileFailure(statusCode));
  }
}

function * updateProfile(api, profileData) {
  const response = yield call(authSaga, api.updateProfile, profileData);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const profile = get(data, 'result');
    yield put(Actions.updateProfileSuccess(profile));
  } else {
    const message = get(data, 'message');
    const errors = get(data, 'errors');
    yield put(Actions.updateProfileFailure(statusCode, errors, message));
  }
}

export function * watchGetProfile(api) {
  while (true) {
    yield take(Types.GET_PROFILE);
    yield call(getProfile, api);
  }
}

export function * watchUpdateProfile(api) {
  while (true) {
    const {profileData} = yield take(Types.UPDATE_PROFILE);
    yield call(updateProfile, api, profileData);
  }
}
