import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  email: null,
  loginToken: null
});

const loginSuccess = (state, action) =>
  state.merge({
    email: action.data.email,
    loginToken: action.data.loginToken
  });

const loginFailure = (state, action) =>
  state.merge({
    email: null,
    loginToken: null
  });

const tokenSuccess = (state, action) =>
  state.merge({
    email: action.email
  });

const tokenFailure = (state, action) =>
  state.merge({
    email: null,
    loginToken: null
  });

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.FB_LOGIN_SUCCESS]: loginSuccess,
  [Types.FB_LOGIN_FAILURE]: loginFailure,
  [Types.GOOGLE_LOGIN_SUCCESS]: loginSuccess,
  [Types.GOOGLE_LOGIN_FAILURE]: loginFailure,
  [Types.GET_TOKEN_SUCCESS]: tokenSuccess,
  [Types.GET_TOKEN_FAILURE]: tokenFailure,
  [Types.LOGOUT]: logout
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
