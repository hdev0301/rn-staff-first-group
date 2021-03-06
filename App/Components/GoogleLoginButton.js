import React, {Component, PropTypes} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../I18n/I18n.js';
import {Colors} from '../Themes';
import styles from './Styles/GoogleLoginButtonStyle';

class GoogleLoginButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    const {onPress} = this.props;
    const label = I18n.t('googleLoginButton-label');

    return (
      <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
        <Icon name="google-plus-square" size={24} color={Colors.white}/>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    )
  }
}

export default GoogleLoginButton;
