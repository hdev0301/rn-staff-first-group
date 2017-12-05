import React, {Component, PropTypes} from 'react';
import {View, TextInput, StyleSheet, Text, findNodeHandle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Themes/Colors';
import styles from './Styles/CustomTextAreaStyle';

class CustomTextArea extends Component {
  static propTypes = {
    textInput: PropTypes.object.isRequired,
    error: PropTypes.string
  }

  static defaultProps = {
    error: null
  }

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
    const {textInput, error} = this.props;
    const {focused} = this.state;

    let borderColor = Colors.grey;
    if (error) {
      borderColor = Colors.red;
    } else if (focused) {
      borderColor = Colors.darkBlue;
    }

    let {numberOfLines, ...textInputProps} = textInput;
    numberOfLines = numberOfLines || 3;

    textInputContainerStyle = StyleSheet.flatten([styles.textInputContainer, {borderColor, height: numberOfLines * 26 + 28}]);

    textInputProps = {
      style: styles.textInput,
      multiline: true,
      keyboardType: 'default',
      underlineColorAndroid: 'transparent',
      editable: true,
      autoCapitalize: 'none',
      autoCorrect: false,
      ref: 'input',
      placeholderTextColor: Colors.darkerGrey,
      ...textInputProps
    };

    return (
      <View>
        <View style={textInputContainerStyle}>
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

export default CustomTextArea;
