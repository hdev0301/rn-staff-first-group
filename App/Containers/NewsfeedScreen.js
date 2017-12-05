import React, {Component, PropTypes} from 'react';
import {Platform, View, WebView, ActivityIndicator, Linking} from 'react-native';
import {Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {isNil, includes, get} from 'lodash';
import env from '../Config/Env';
import I18n from '../I18n/I18n.js';
import MainToolbar from '../Components/MainToolbar';
import {Colors} from '../Themes';
import styles from '../Components/Styles/WebViewStyle';

class NewsfeedScreen extends Component {
  static propTypes = {
    profile: PropTypes.object,
    scene: PropTypes.object
  };

  dummy = new Date().getTime();

  componentWillReceiveProps(nextProps) {
    const {scene} = nextProps;
    const {scene: oldScene} = this.props;

    const sceneName = get(scene, 'name');
    const oldSceneName = get(oldScene, 'name');

    if ((sceneName !== oldSceneName && includes(['newsfeedEditor', 'newsfeedNoEditor'], sceneName)) || sceneName === 'tabBar') {
      this.dummy = new Date().getTime();
    }
  }

  handlePressWebviewBack = () => {
    this.webView.goBack();
  }

  handleNavigationStateChange = navigationState => {
    if (Platform.OS === 'android') {
      const {url} = navigationState;
      if (/file_attachments|\.(pdf|doc|docx|xls|xlsx|zip)$/.test(url)) {
        Linking.openURL(url);
      }
    }
  }

  render() {
    const {profile: {user_id: userId}} = this.props;
    const title = I18n.t('newsfeed-title');
    const uri = encodeURI(isNil(userId) ? `${env.app.newsfeedUrl}?dummy=${this.dummy}` : `${env.app.newsfeedUrl}?user_id=${userId}&dummy=${this.dummy}`);

    return (
      <View style={[styles.mainContainer]}>
        <MainToolbar title={title} leftButton={{icon: 'chevron-left', onPress: this.handlePressWebviewBack}} />
          <WebView
            ref={(c) => this.webView = c}
            source={{uri}}
            style={styles.webViewTab}
            startInLoadingState={true}
            renderLoading={() => <View style={styles.loadingView}><ActivityIndicator color={Colors.darkBlue} animating={true} size={'large'} /></View>}
            allowsInlineMediaPlayback={true}
            onNavigationStateChange={this.handleNavigationStateChange}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profileData,
    scene: state.scene.sceneData
  }
};

export default connect(mapStateToProps)(NewsfeedScreen);
