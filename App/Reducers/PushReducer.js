import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import _ from 'lodash';

export const INITIAL_STATE = Immutable({
  registerPushSubmitting: false,
  registerPushErrorCode: null,
  registerPushErrorMessage: null
});

const registerPushRequest = (state, action) =>
  state.merge({
    registerPushSubmitting: true,
    feedbackAddErrorCode: null,
    feedbackAddErrorMessage: null
  });

const registerPushSuccess = (state, action) =>
  state.merge({
    registerPushSubmitting: false,
    registerPushErrorCode: null,
    registerPushErrorMessage: null
  });

const registerPushFailure = (state, action) =>
  state.merge({
    registerPushSubmitting: false,
    registerPushErrorCode: action.errorCode,
    registerPushErrorMessage: action.message
  });

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [Types.REGISTER_PUSH]: registerPushRequest,
  [Types.REGISTER_PUSH_SUCCESS]: registerPushSuccess,
  [Types.REGISTER_PUSH_FAILURE]: registerPushFailure,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
