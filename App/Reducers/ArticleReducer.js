import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {isEmpty, values, forIn, camelCase} from 'lodash';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  articleAddSubmitting: false,
  articleAddErrorCode: null,
  articleAddErrors: null,
  articleAddErrorMessage: null
});

const addArticleRequest = (state, action) =>
  state.merge({
    articleAddSubmitting: true,
    articleAddErrorCode: null,
    articleAddErrors: null,
    articleAddErrorMessage: null
  });

const addArticleSuccess = (state, action) =>
  state.merge({
    articleAddSubmitting: false,
    articleAddErrorCode: null,
    articleAddErrors: null,
    articleAddErrorMessage: null,
  });

const addArticleFailure = (state, action) => {
  let camelCasedErrors = {};
  forIn(action.data.errors, (value, key) => camelCasedErrors[camelCase(key)] = value);

  return state.merge({
    articleAddSubmitting: false,
    articleAddErrors: !isEmpty(camelCasedErrors) ? camelCasedErrors : null,
    articleAddErrorCode: action.data.errorCode,
    articleAddErrorMessage: !isEmpty(action.data.errors) ? values(action.data.errors).join('. ') : action.data.message,
  });
};

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [Types.ADD_ARTICLE]: addArticleRequest,
  [Types.ADD_ARTICLE_SUCCESS]: addArticleSuccess,
  [Types.ADD_ARTICLE_FAILURE]: addArticleFailure,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
