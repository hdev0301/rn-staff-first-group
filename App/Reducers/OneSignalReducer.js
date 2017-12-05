import {get} from 'lodash';
import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  pushId: null
});

const oneSignalIdsAvailable = (state, action) =>
  state.merge({
    pushId: get(action, 'ids.userId'),
  });

const logout = (state, action) => Immutable({
    ...INITIAL_STATE,
    pushId: state.pushId
});

const ACTION_HANDLERS = {
  [Types.ONE_SIGNAL_IDS_AVAILABLE]: oneSignalIdsAvailable,
  [Types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);