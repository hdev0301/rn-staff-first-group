import React, {Component, PropTypes} from 'react';
import {View, TextInput, StyleSheet, Text, findNodeHandle} from 'react-native';
import {get} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Themes/Colors';
import styles from './Styles/CustomTextInputStyle';

class CustomTextInput extends Component {
  static propTypes = {
    textInput: PropTypes.object.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    styleEditable: PropTypes.bool
  };

  static defaultProps = {
    error: null,
    styleEditable: false
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  getNodeHandle() {
    return findNodeHandle(this.refs.input);
  }

  render() {
    const {textInput, icon, error, styleEditable} = this.props;
    const {focused} = this.state;
    const editable = get(textInput, 'editable', true);

    let backgroundColor = Colors.grey;
    let iconColor = Colors.darkGrey;
    let borderColor = Colors.grey;
    let inputBackgroundColor = styleEditable && !editable ? Colors.lightGrey : Colors.white;

    if (error) {
      backgroundColor = Colors.red;
      iconColor = Colors.white;
      borderColor = Colors.red;
    } else if (focused) {
      backgroundColor = Colors.darkBlue;
      iconColor = Colors.white;
      borderColor = Colors.darkBlue;
    }

    textInputContainerStyle = StyleSheet.flatten([styles.textInputContainer, {borderColor, backgroundColor: inputBackgroundColor}]);
    textInputImageContainerStyle = StyleSheet.flatten([styles.textInputImageContainer, {backgroundColor}]);

    const textInputProps = {
      style: StyleSheet.flatten([styles.textInput, {paddingLeft: icon ? 60 : 15}]),
      keyboardType: 'default',
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'none',
      autoCorrect: false,
      ref: 'input',
      placeholderTextColor: Colors.darkerGrey,
      editable,      
      ...textInput
    };

    return (
      <View>
        <View style={textInputContainerStyle}>
          {icon && (
            <View style={textInputImageContainerStyle}>
              <Icon name={icon} size={20} color={iconColor}/>
            </View>
          )}
          <TextInput
            {...textInputProps}
            onFocus={() => this.setState({focused: true})}
            onBlur={() => this.setState({focused: false})}
          />
        </View>
        {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}
      </View>
    )
  }
}

export default CustomTextInput;
