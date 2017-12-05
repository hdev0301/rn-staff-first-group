import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import _ from 'lodash';

export const INITIAL_STATE = Immutable({
  resetPasswordSubmitting: false,
  resetPasswordErrorCode: null,
  resetPasswordErrorMessage: null
});

const resetPasswordRequest = (state, action) =>
  state.merge({
    resetPasswordSubmitting: true,
    resetPasswordErrorCode: null,
    resetPasswordErrorMessage: null
  });

const resetPasswordSuccess = (state, action) =>
  state.merge({
    resetPasswordSubmitting: false,
    resetPasswordErrorCode: null,
    resetPasswordErrorMessage: null
  });

const resetPasswordFailure = (state, action) =>
  state.merge({
    resetPasswordSubmitting: false,
    resetPasswordErrorCode: action.errorCode,
    resetPasswordErrorMessage: action.errors ? _.values(action.errors).join('. ') : action.message
  });

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [Types.RESET_PASSWORD]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
