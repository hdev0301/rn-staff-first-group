import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../Themes/Colors';
import Styles from './Styles/CustomPickerStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomPicker extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  static defaultProps = {
    error: null
  }

  render() {
    let {value, placeholder, icon, onPress, error} = this.props;

    let backgroundColor = Colors.grey;
    let iconColor = Colors.darkGrey;
    let borderColor = Colors.grey;
    if (error) {
      backgroundColor = Colors.red;
      iconColor = Colors.white;
      borderColor = Colors.red;
    }

    let pickerContainerStyle = StyleSheet.flatten([Styles.pickerContainer, {borderColor}]);
    let pickerImageContainerStyle = StyleSheet.flatten([Styles.pickerImageContainer, {backgroundColor}]);

    let selectedValue = value || placeholder;

    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <View style={pickerContainerStyle}>
            {icon && (
              <View style={pickerImageContainerStyle}>
                <Icon name={icon} size={20} color={iconColor}/>
              </View>
            )}
            <View style={Styles.pickerTextContainer}>
              <Text style={Styles.pickerText} numberOfLines={1}>{selectedValue}</Text>
            </View>
            <View style={Styles.pickerArrowContainer}>
              <Icon name="caret-down" size={22} color={Colors.darkGrey}/>
            </View>
          </View>
        </TouchableOpacity>
        {error && <View style={Styles.errorContainer}><Text style={Styles.errorText}>{error}</Text></View>}
      </View>
    )
  }
}
