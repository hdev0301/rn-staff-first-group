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

class ModifyProfilePhoneScreen extends Component {
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
      phone: (value) => {
        if (value) {
          if (!validator.isNumeric(value)) {
            return I18n.t('validation-phone');
          }
          const minLength = 7;
          if (!validator.isLength(value, {min: minLength})) {
            return I18n.t('validation-numberMinLength').replace('{0}', minLength);
          }
        }
        return null;
      }
    };

    this.state = {
      form: {
        phone: get(props, 'profile.phone'),
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

  handlePressSubmitProfilePhone = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch, profile: {first_name, last_name, employee_id}} = this.props;
      const {phone} = form;
      dispatch(Actions.updateProfile({firstName: first_name, lastName: last_name, employeeId: employee_id, phone}));
    }
  };

  handleBack = () => {
    NavActions.pop();
  };

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {phone} = this.refs;
      const inputs = [phone.getNodeHandle()];
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
    const {phone} = form;
    const {profileUpdateSubmitting: attempting} = this.props;

    const title = I18n.t('modifyProfilePhone-title');
    const info = I18n.t('modifyProfilePhone-info');

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
              <CustomTextInput ref="phone" icon="phone" error={get(formErrors, 'phone')} textInput={{
                  keyboardType: 'phone-pad',
                  placeholder: I18n.t('placeholder-phone'),
                  defaultValue: phone,
                  onChangeText: phone => this.setState({form: {...form, phone}}),
                  editable: !attempting
              }}/>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={this.handlePressSubmitProfilePhone} label={I18n.t('modifyProfilePhone-done')} showSpinner={attempting}/>
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

export default connect(mapStateToProps)(ModifyProfilePhoneScreen);
