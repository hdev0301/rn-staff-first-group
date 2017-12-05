import React, {Component, PropTypes} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import {isEmpty, random} from 'lodash';
import I18n from '../I18n/I18n.js';
import {getCurrentDateKey} from '../Helpers/DateHelpers';
import {Images} from '../Themes';
import {safetyMessages, fallbackSafetyMessages} from '../Mocks/SafetyMessages';
import styles from './Styles/SafetyMessageDialogStyle';

class SafetyMessageDialog extends Component {
  state = {
    message: null,
    isOpen: false
  };

  timer = null;

  open = (timeout = 6000) => {
    const message = this.getRandomMessage();
    this.setState({isOpen: true, message}, () => {
      this.timer = setTimeout(() => this.close(), timeout);
    });
  }

  close = () => {
    this.setState({isOpen: false});
  }

  getRandomMessage = () => {
    const currentDateKey = getCurrentDateKey();
    const messages = safetyMessages[currentDateKey] || fallbackSafetyMessages;
    const message = messages[random(0, messages.length - 1)];
    return message;
  }

  handleCancelTimeoutAndClose = () => {
    clearTimeout(this.timer);
    this.close();
  }

  render() {
    const {isOpen, message} = this.state;
    return (
      <Modal style={styles.modal} backdropPressToClose={false} swipeToClose={false} isOpen={isOpen}>
        <TouchableOpacity onPress={this.handleCancelTimeoutAndClose} style={styles.modalContentButton}>
          <View style={styles.backgroundImageWrapper}>
            <Image source={Images.safetyMessageBackground} style={styles.backgroundImage} resizeMode='stretch'/>
          </View>
          <View style={styles.safetyMessageWrapper}>
            <Text style={styles.safetyMessage}>{message}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

export default SafetyMessageDialog;