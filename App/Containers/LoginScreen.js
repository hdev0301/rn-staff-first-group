import React, {PropTypes, Component} from 'react';
import {View, StatusBar, ScrollView, Text, Image, TouchableOpacity, Keyboard, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import {get, map, split, trim} from 'lodash';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import I18n from '../I18n/I18n.js';
import Actions from '../Actions/Creators';
import {Images, Metrics, Colors} from '../Themes';
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';
import FbLoginButton from '../Components/FbLoginButton';
import GoogleLoginButton from '../Components/GoogleLoginButton';
import {validate} from '../Helpers/ValidationHelper';
import styles from './Styles/LoginScreenStyle';

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fbLoginSubmitting: PropTypes.bool,
    fbLoginErrorCode: PropTypes.number,
    fbLoginErrorMessage: PropTypes.string,
    fbLoginProblem: PropTypes.string,
    googleLoginSetupReady: PropTypes.bool,
    googleLoginSubmitting: PropTypes.bool,
    googleLoginErrorCode: PropTypes.number,
    googleLoginErrorMessage: PropTypes.string,
    googleLoginProblem: PropTypes.string,
    loginSubmitting: PropTypes.bool,
    loginErrorCode: PropTypes.number,
    loginErrorMessage: PropTypes.string,
    loginProblem: PropTypes.string,
    tokenProblem: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object
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
      },
      password: (value) => {
        if (!value) {
          return I18n.t('validation-presence');
        }
        return null;
      }
    };

    this.state = {
      form: {
        email: null,
        password: null
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
    const {
      loginSubmitting, loginErrorMessage, loginErrorCode,
      fbLoginSubmitting, fbLoginErrorMessage, fbLoginErrorCode,
      googleLoginSubmitting, googleLoginErrorMessage, googleLoginErrorCode
    } = nextProps;
    const {
      loginSubmitting: oldLoginSubmitting,
      fbLoginSubmitting: oldFbLoginSubmitting,
      googleLoginSubmitting: oldGoogleLoginSubmitting
    } = this.props;
    const {dropdownAlert} = this.context;

    if (oldLoginSubmitting && !loginSubmitting) {
      const errorMessage = loginErrorMessage || loginErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', I18n.t('error'), errorMessage.toString());
      }
    }

    if (oldFbLoginSubmitting && !fbLoginSubmitting) {
      const errorMessage = fbLoginErrorMessage || fbLoginErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', I18n.t('error'), errorMessage.toString());
      }
    }

    if (oldGoogleLoginSubmitting && !googleLoginSubmitting) {
      const errorMessage = googleLoginErrorMessage || googleLoginErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', I18n.t('error'), errorMessage.toString());
      }
    }
  }

  handlePressPasswordForgot = () => {
    NavActions.resetPassword();
  }

  handlePressRegister = () => {
    NavActions.register({type: NavActionConst.REPLACE});
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

  handlePressLogin = () => {
    const {loginSubmitting} = this.props;
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors && !loginSubmitting) {
      const {dispatch} = this.props;
      const {email, password} = form;
      const cleanedLoginToken = email.trim().toLowerCase();
      dispatch(Actions.login(cleanedLoginToken, password));
    }
  }

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {email, password} = this.refs;
      const inputs = [email.getNodeHandle(), password.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  }

  handleFbLogin = () => {
    const {dispatch, fbLoginSubmitting} = this.props;
    if (!fbLoginSubmitting) {
      dispatch(Actions.fbLogin());
    }
  }

  handleGoogleLogin = () => {
    const {dispatch, googleLoginSubmitting} = this.props;
    if (!googleLoginSubmitting) {
      dispatch(Actions.googleLogin());
    }
  }

  renderNetworkErrorInfo = () => {
    const {loginProblem, fbLoginProblem, googleLoginProblem, tokenProblem} = this.props;
    if (
      loginProblem === 'NETWORK_ERROR' ||
      fbLoginProblem === 'NETWORK_ERROR' ||
      googleLoginProblem === 'NETWORK_ERROR' ||
      tokenProblem === 'NETWORK_ERROR'
    ) {
      return (
        <View style={styles.networkErrorInfoContainer}>
          <View style={styles.networkErrorInfoWrapper}>
            {map(split(I18n.t('error-networkLine'), '<br>'), (item, index) => <Text key={index} style={styles.networkErrorInfoText}>{trim(item)}</Text>)}
          </View>
        </View>
      );
    }
  }

  getScrollViewHeight = () => {
    return Metrics.screenHeight - Metrics.firstviewBannerHeight - Metrics.statusBarHeight;
  }

  render() {
    const {form, formErrors} = this.state;
    const {loginSubmitting, googleLoginSetupReady} = this.props;

    return (
      <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
        <StatusBar barStyle='default' backgroundColor={Colors.darkGrey}/>
        <View style={styles.firstviewHeader}>
          <Image source={Images.firstviewBanner} style={styles.firstviewHeaderImage}/>
        </View>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: Metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps={true}
          keyboardDismissMode='on-drag'
        >
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{I18n.t('login-title')}</Text>
          </View>
          {this.renderNetworkErrorInfo()}
          <FbLoginButton onPress={this.handleFbLogin} />
          {googleLoginSetupReady && <GoogleLoginButton onPress={this.handleGoogleLogin} />}
          <View>
            <Text style={styles.infoText}>{I18n.t('login-info')}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomTextInput ref="email" icon="user" error={get(formErrors, 'email')} textInput={{
                keyboardType: 'email-address',
                placeholder: I18n.t('placeholder-email'),
                onChangeText: email => this.setState({form: {...form, email}}),
                editable: !loginSubmitting
              }}/>
              <CustomTextInput ref="password" icon="key" error={get(formErrors, 'password')} textInput={{
                placeholder: I18n.t('placeholder-password'),
                onChangeText: password => this.setState({form: {...form, password}}),
                editable: !loginSubmitting,
                secureTextEntry: true
              }}/>
            </View>
          </View>
          <View style={styles.passwordForgotLinkContainer}>
            <TouchableOpacity onPress={this.handlePressPasswordForgot}>
              <Text style={styles.passwordForgotLink}>{I18n.t('login-passwordForgotLink')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton onPress={this.handlePressLogin} label={I18n.t('login-submitButton')} showSpinner={loginSubmitting}/>
          </View>
          <View style={styles.registerLinkContainer}>
            <Text>{I18n.t('login-dontHaveAccount')}</Text>
            <TouchableOpacity style={styles.registerLinkWrapper} onPress={this.handlePressRegister}>
              <Text style={styles.registerLink}>{I18n.t('login-registerLink')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fbLoginSubmitting: state.login.fbLoginSubmitting,
    fbLoginErrorCode: state.login.fbLoginErrorCode,
    fbLoginErrorMessage: state.login.fbLoginErrorMessage,
    fbLoginProblem: state.login.fbLoginProblem,
    googleLoginSetupReady: state.login.googleLoginSetupReady,
    googleLoginSubmitting: state.login.googleLoginSubmitting,
    googleLoginErrorCode: state.login.googleLoginErrorCode,
    googleLoginErrorMessage: state.login.googleLoginErrorMessage,
    googleLoginProblem: state.login.googleLoginProblem,
    loginSubmitting: state.login.loginSubmitting,
    loginErrorCode: state.login.loginErrorCode,
    loginErrorMessage: state.login.loginErrorMessage,
    loginProblem: state.login.loginProblem,
    tokenProblem: state.login.tokenProblem
  };
};

export default connect(mapStateToProps)(LoginScreen);
