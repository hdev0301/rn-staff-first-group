import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import Types from '../Actions/Types';
import Actions from '../Actions/Creators';
import {authSaga} from './AuthSaga';

function * addArticle(api, articleData) {
  const response = yield call(authSaga, api.addArticle, articleData);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(Actions.addArticleSuccess());
  } else {
    const message = get(data, 'message');
    const errors = get(data, 'errors');
    yield put(Actions.addArticleFailure(statusCode, errors, message));
  }
}

export function * watchAddArticle(api) {
  while (true) {
    const {data} = yield take(Types.ADD_ARTICLE);
    yield call(addArticle, api, data);
  }
}
