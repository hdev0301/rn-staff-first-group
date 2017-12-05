import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import {View} from 'react-native';
import Actions from './Actions/Creators';
import DebugSettings from './Config/DebugSettings';
import scenes from './Navigation/Scenes';
import {Router, Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import {Fonts} from './Themes';
import Fabric from 'react-native-fabric';
const {Answers} = Fabric;

const defaultStyle = {fontFamily: Fonts.type.openSans};
setCustomText({style: defaultStyle});
setCustomTextInput({style: defaultStyle});

import styles from './Containers/Styles/RootStyle';

const RouterWithRedux = connect()(Router);

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    scene: PropTypes.object.isRequired,
    initialized: PropTypes.bool.isRequired
  }

  componentWillMount() {
    const {dispatch} = this.props.store;
    dispatch(Actions.startup());
  }

  componentWillReceiveProps(nextProps) {
    const {store: {dispatch}, scene: {sceneKey}, authToken, initialized, pushId} = nextProps;
    const {authToken: oldAuthToken, pushId: oldPushId, scene: {sceneKey: oldSceneKey}} = this.props;
    if (initialized) {
      if (
        !!authToken && !!pushId &&
        (
          sceneKey === 'startup' ||
          oldAuthToken !== authToken ||
          oldPushId !== pushId
        )
      ) {
        dispatch(Actions.registerPush(pushId));
      }

      if (oldSceneKey === 'login' && sceneKey === 'tabBar' && !!pushId) {
        dispatch(Actions.subscribeToOneSignal());
      }

      if (sceneKey === 'startup' || oldAuthToken !== authToken) {

        Answers.logLogin('App login', true);

        if (!authToken) {
          NavActions.login({type: NavActionConst.REPLACE});
        } else {
          dispatch(Actions.getProfile());
          NavActions.tabBar({type: NavActionConst.REPLACE});
        }
      }
    }
  }

  render() {
    const {store} = this.props;
    console.disableYellowBox = !DebugSettings.yellowBox;
    return (
      <Provider store={store}>
        <RouterWithRedux sceneStyle={styles.scene} scenes={scenes} />
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.login.authToken,
    initialized: state.startup.initialized,
    pushId: state.oneSignal.pushId,
    scene: state.scene.sceneData
  };
};

export default connect(mapStateToProps)(Root);
