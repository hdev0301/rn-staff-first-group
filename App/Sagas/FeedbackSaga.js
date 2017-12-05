import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';
import {authSaga} from './AuthSaga';

function * addFeedback(api, feedbackData) {
  const response = yield call(authSaga, api.addFeedback, feedbackData);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(Actions.addFeedbackSuccess());
  } else {
    const message = get(data, 'message');
    const errors = get(data, 'errors');
    yield put(Actions.addFeedbackFailure(statusCode, errors, message));
  }
}

export function * watchAddFeedback(api) {
  while (true) {
    const {data} = yield take(Types.ADD_FEEDBACK);
    yield call(addFeedback, api, data);
  }
}
