import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './App/Root';
import configureStore from './App/Store/Store';
import configureOneSignal from './App/Config/OneSignalConfig';

// Handling store here to avoid hot-reloading issues
const store = configureStore();

configureOneSignal(store.dispatch);

class RNBase extends React.Component {
  render () {
    return <Root {...this.props} store={store}/>
  }
}

AppRegistry.registerComponent('FirstStudent', () => RNBase);
