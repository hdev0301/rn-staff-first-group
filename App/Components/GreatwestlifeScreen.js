import React, {Component, PropTypes} from 'react';
import {View, WebView, ActivityIndicator} from 'react-native';
import {Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import env from '../Config/Env';
import I18n from '../I18n/I18n.js';
import MainToolbar from './MainToolbar';
import {Colors} from '../Themes';
import styles from '../Components/Styles/WebViewStyle';

class GreatwestlifeScreen extends Component {

  handleBack = () => {
    NavActions.pop();
  };

  render() {
    const title = I18n.t('greatwestlife-title');
    return (
      <View style={[styles.mainContainer]}>
        <MainToolbar title={title} leftButton={{text: I18n.t('mainToolbar-back'), onPress: this.handleBack}}/>
        <WebView
          source={{uri: encodeURI(env.app.perkspotUrl)}}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => <View style={styles.loadingView}><ActivityIndicator color={Colors.darkBlue} animating={true} size={'large'} /></View>}
          />
      </View>
    )
  }
}

export default GreatwestlifeScreen;
