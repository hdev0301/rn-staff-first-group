import React, {PropTypes, Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, TouchableHighlight, Keyboard, LayoutAnimation, ListView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {get, map, split, trim} from 'lodash';
import MainToolbar from '../Components/MainToolbar';
import I18n from '../I18n/I18n.js';
import Actions from '../Actions/Creators';
import {Images, Metrics, Colors} from '../Themes';
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';
import {Actions as NavActions} from 'react-native-router-flux';
import {validate} from '../Helpers/ValidationHelper';
import styles from './Styles/ModifyScreenStyle';

class ResetPasswordScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    resetPasswordSubmitting: PropTypes.bool,
    resetPasswordErrorCode: PropTypes.number,
    resetPasswordErrorMessage: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object,
    confirmationDialog: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      email: (value) => {
        if (!value) {
          return I18n.t('validation-presence');
        }
        if (!validator.isEmail(value.trim())) {
          return I18n.t('validation-email');
        }
        return null;
      }
    };

    this.state = {
      form: {
        email: null
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight()
    };
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillReceiveProps(nextProps) {
    const {resetPasswordSubmitting, resetPasswordErrorMessage, resetPasswordErrorCode, dispatch} = nextProps;
    const {resetPasswordSubmitting: oldResetPasswordSubmitting} = this.props;
    const {dropdownAlert, confirmationDialog} = this.context;

    if (oldResetPasswordSubmitting && !resetPasswordSubmitting) {
      const errorMessage = resetPasswordErrorMessage || resetPasswordErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', I18n.t('error'), errorMessage.toString());
      } else {
        NavActions.pop();
        confirmationDialog.show(I18n.t('resetPassword-successful'));
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = this.getScrollViewHeight() - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize
    });
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: this.getScrollViewHeight()
    });
  }

  handlePressResetPassword = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch} = this.props;
      const {email} = form;
      dispatch(Actions.resetPassword(email));
    }
  }

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {email} = this.refs;
      const inputs = [email.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  }

  handleBack = () => {
    NavActions.pop();
  }

  getScrollViewHeight = () => {
    return Metrics.screenHeight - Metrics.mainToolbarHeight - Metrics.statusBarHeight;
  }

  render() {
    const title = I18n.t('resetPassword-title');

    const {form, formErrors} = this.state;
    const {resetPasswordSubmitting} = this.props;

    return (
      <View style={[styles.mainContainer]} onStartShouldSetResponderCapture={this.handleCapture}>
        <MainToolbar title={title} leftButton={{text: I18n.t('mainToolbar-cancel'), onPress: this.handleBack}}/>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: Metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps={true}
          keyboardDismissMode='on-drag'
        >
          <View style={styles.infoTextContainer}>
            {map(split(I18n.t('resetPassword-info'), '<br>'), (item, index) => <Text key={index} style={styles.infoText}>{trim(item)}</Text>)}
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomTextInput ref="email" icon="envelope" error={get(formErrors, 'email')} textInput={{
                keyboardType: 'email-address',
                placeholder: I18n.t('placeholder-email'),
                onChangeText: email => this.setState({form: {...form, email}}),
                editable: !resetPasswordSubmitting
              }}/>
            </View>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton onPress={this.handlePressResetPassword} label={I18n.t('resetPassword-button')} showSpinner={resetPasswordSubmitting}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resetPasswordSubmitting: state.password.resetPasswordSubmitting,
    resetPasswordErrorCode: state.password.resetPasswordErrorCode,
    resetPasswordErrorMessage: state.password.resetPasswordErrorMessage
  }
};

export default connect(mapStateToProps)(ResetPasswordScreen);
