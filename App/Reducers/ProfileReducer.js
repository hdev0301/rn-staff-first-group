import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import _ from 'lodash';

export const INITIAL_STATE = Immutable({
  profileData: {},
  profileFetching: false,
  profileError: null,
  profileUpdateSubmitting: false,
  profileUpdateErrorCode: null,
  profileUpdateErrorMessage: null
});

const getProfileRequest = (state, action) =>
  state.merge({
    profileFetching: true
  });

const getProfileSuccess = (state, action) =>
  state.merge({
    profileFetching: false,
    profileError: null,
    profileData: action.profile
  });

const getProfileFailure = (state, action) =>
  state.merge({
    profileFetching: false,
    profileError: true,
    profileData: {}
  });

const updateProfileRequest = (state, action) =>
  state.merge({
    profileUpdateSubmitting: true,
    profileUpdateErrorCode: null,
    profileUpdateErrorMessage: null
  });

const updateProfileSuccess = (state, action) =>
  state.merge({
    profileUpdateSubmitting: false,
    profileUpdateErrorCode: null,
    profileUpdateErrorMessage: null
  });

const updateProfileFailure = (state, action) =>
  state.merge({
    profileUpdateSubmitting: false,
    profileUpdateErrorCode: action.errorCode,
    profileUpdateErrorMessage: action.errors ? _.values(action.errors).join('. ') : action.message
  });

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [Types.GET_PROFILE]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,
  [Types.UPDATE_PROFILE]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
