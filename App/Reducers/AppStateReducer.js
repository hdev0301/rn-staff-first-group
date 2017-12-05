import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  currentState: null
});

const appState = (state, action) =>
  state.merge({
    currentState: action.data
  });

const ACTION_HANDLERS = {
  [Types.APP_STATE]: appState
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
