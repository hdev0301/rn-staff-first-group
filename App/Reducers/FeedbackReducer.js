import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {isEmpty, values} from 'lodash';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  feedbackAddSubmitting: false,
  feedbackAddErrorCode: null,
  feedbackAddErrors: null,
  feedbackAddErrorMessage: null
});

const addFeedbackRequest = (state, action) =>
  state.merge({
    feedbackAddSubmitting: true,
    feedbackAddErrorCode: null,
    feedbackAddErrors: null,
    feedbackAddErrorMessage: null
  });

const addFeedbackSuccess = (state, action) =>
  state.merge({
    feedbackAddSubmitting: false,
    feedbackAddErrorCode: null,
    feedbackAddErrors: null,
    feedbackAddErrorMessage: null
  });

const addFeedbackFailure = (state, action) => {
  let camelCasedErrors = {};
  forIn(action.data.errors, (value, key) => camelCasedErrors[camelCase(key)] = value);

  return state.merge({
    feedbackAddSubmitting: false,
    feedbackAddErrors: !isEmpty(camelCasedErrors) ? camelCasedErrors : null,
    feedbackAddErrorCode: action.data.errorCode,
    feedbackAddErrorMessage: !isEmpty(action.data.errors) ? values(action.data.errors).join('. ') : action.data.message,
  });
};

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [Types.ADD_FEEDBACK]: addFeedbackRequest,
  [Types.ADD_FEEDBACK_SUCCESS]: addFeedbackSuccess,
  [Types.ADD_FEEDBACK_FAILURE]: addFeedbackFailure,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
