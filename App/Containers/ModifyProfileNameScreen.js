import React, {PropTypes, Component} from 'react';
import {View, ScrollView, Text, Keyboard, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {get} from 'lodash';
import MainToolbar from '../Components/MainToolbar';
import I18n from '../I18n/I18n.js';
import Actions from '../Actions/Creators';
import {Metrics} from '../Themes';
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';
import {Actions as NavActions} from 'react-native-router-flux';
import {validate} from '../Helpers/ValidationHelper';
import styles from './Styles/ModifyScreenStyle';

class ModifyProfileNameScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object,
    onDone: PropTypes.func,
    profileUpdateSubmitting: PropTypes.bool,
    profileUpdateErrorCode: PropTypes.number,
    profileUpdateErrorMessage: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      firstName: (value) => {
        if (!value) {
          return I18n.t('validation-presence');
        }
        const minLength = 2;
        if (!validator.isLength(value, {min: minLength})) {
          return I18n.t('validation-stringMinLength').replace('{0}', minLength);
        }
        return null;
      },
      lastName: (value) => {
        if (!value) {
          return I18n.t('validation-presence');
        }
        const minLength = 2;
        if (!validator.isLength(value, {min: minLength})) {
          return I18n.t('validation-stringMinLength').replace('{0}', minLength);
        }
        return null;
      }
    };

    this.state = {
      form: {
        firstName: get(props, 'profile.first_name'),
        lastName: get(props, 'profile.last_name'),
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight(),
    };
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillReceiveProps(nextProps) {
    const {onDone, profileUpdateSubmitting, profileUpdateErrorMessage, profileUpdateErrorCode} = nextProps;
    const {profileUpdateSubmitting: oldProfileUpdateSubmitting} = this.props;

    if (oldProfileUpdateSubmitting && !profileUpdateSubmitting) {
      const errorMessage = profileUpdateErrorMessage || profileUpdateErrorCode;
      if (errorMessage) {
        this.context.dropdownAlert.alert('error', I18n.t('error'), errorMessage.toString());
      } else {
        NavActions.pop();
        onDone && onDone();
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
  };

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: this.getScrollViewHeight()
    });
  };

  handlePressSubmitProfileName = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch, profile: {employee_id, phone}} = this.props;
      const {firstName, lastName} = form;
      dispatch(Actions.updateProfile({firstName, lastName, employeeId: employee_id, phone}));
    }
  };

  handleBack = () => {
    NavActions.pop();
  };

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {firstName, lastName} = this.refs;
      const inputs = [firstName.getNodeHandle(), lastName.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  };

  getScrollViewHeight = () => {
    return Metrics.screenHeight - Metrics.mainToolbarHeight - Metrics.statusBarHeight;
  }

  render() {
    const {form, formErrors} = this.state;
    const {firstName, lastName} = form;
    const {profileUpdateSubmitting: attempting} = this.props;

    const title = I18n.t('modifyProfileName-title');
    const info = I18n.t('modifyProfileName-info');

    return (
      <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
        <MainToolbar title={title} leftButton={{text: I18n.t('mainToolbar-cancel'), onPress: this.handleBack}}/>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: Metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps={true}
          keyboardDismissMode='on-drag'
        >
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{info}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomTextInput ref="firstName" icon="user" error={get(formErrors, 'firstName')} textInput={{
                  autoCapitalize: 'words',
                  placeholder: I18n.t('placeholder-firstName'),
                  defaultValue: firstName,
                  onChangeText: firstName => this.setState({form: {...form, firstName}}),
                  editable: !attempting
              }}/>
              <CustomTextInput ref="lastName" icon="user" error={get(formErrors, 'lastName')} textInput={{
                  autoCapitalize: 'words',
                  placeholder: I18n.t('placeholder-lastName'),
                  defaultValue: lastName,
                  onChangeText: lastName => this.setState({form: {...form, lastName}}),
                  editable: !attempting
              }}/>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={this.handlePressSubmitProfileName} label={I18n.t('modifyProfileName-done')} showSpinner={attempting}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileUpdateSubmitting: state.profile.profileUpdateSubmitting,
    profileUpdateErrorCode: state.profile.profileUpdateErrorCode,
    profileUpdateErrorMessage: state.profile.profileUpdateErrorMessage
  }
};

export default connect(mapStateToProps)(ModifyProfileNameScreen);
