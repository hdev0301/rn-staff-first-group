import {createStore, applyMiddleware, compose} from 'redux';
import {autoRehydrate} from 'redux-persist';
import createLogger from 'redux-logger';
import rootReducer from '../Reducers/';
import Config from '../Config/DebugSettings';
import createSagaMiddleware from 'redux-saga';
import sagas from '../Sagas/';
import R from 'ramda';
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersist from '../Config/ReduxPersist';
import appStateMiddleware from '../Middlewares/AppStateMiddleware';

// the logger master switch
const USE_LOGGING = Config.reduxLogging;
// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'];
// creat the logger
const logger = createLogger({
  predicate: (getState, {type}) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
});

export default () => {

  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware);
  
  middleware.push(appStateMiddleware);

  // Don't ship these
  if (__DEV__) {
    middleware.push(logger);
  }

  enhancers.push(applyMiddleware(...middleware));

  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  const store = createStore(rootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store);
  }
  
  // run sagas
  sagaMiddleware.run(sagas);

  return store;
}
