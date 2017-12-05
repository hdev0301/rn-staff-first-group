import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  initialized: false
});

const setInitialized = (state, action) =>
  state.merge({
    initialized: true
  });

const ACTION_HANDLERS = {
  [Types.INITIALIZED]: setInitialized
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
