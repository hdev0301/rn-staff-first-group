import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors} from '../Themes';
import styles from './Styles/CustomButtonStyle';

class CustomButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    showSpinner: PropTypes.bool,
    disabled: PropTypes.bool,
    borderColor: PropTypes.string,
    fillColor: PropTypes.string,
    textColor: PropTypes.string,
    size: PropTypes.string
  };

  static defaultProps = {
    showSpinner: false,
    disabled: false,
    borderColor: Colors.darkGreen,
    fillColor: Colors.darkGreen,
    textColor: Colors.white,
    size: 'normal'
  };

  render() {
    const {label, onPress, disabled, showSpinner, size, borderColor, fillColor, textColor} = this.props;

    const buttonStyle = [styles.button, {
      backgroundColor: fillColor,
      borderColor,
      padding: size === 'small' ? 10 : size === 'large' ? 14 : 12,
      borderRadius: size === 'small' ? 16 : size === 'large' ? 21 : 20,
    }];
    const buttonTextStyle = [styles.buttonText, {
      color: textColor,
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16
    }];

    return (
      <TouchableOpacity disabled={showSpinner} style={styles.buttonWrapper} onPress={onPress}>
        <View style={buttonStyle}>
          <Text style={buttonTextStyle}>{label}</Text>
          {showSpinner && <ActivityIndicator color={textColor} style={styles.activityIndicator} animating={true}/>}
        </View>
      </TouchableOpacity>
    )
  }
}

export default CustomButton;
