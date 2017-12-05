import React, {PropTypes} from 'react';
import {ScrollView, View, Text, TouchableHighlight, InteractionManager} from 'react-native';
import {connect} from 'react-redux';
import {get, toUpper, includes} from 'lodash';
import Fabric from 'react-native-fabric';
import {Actions as NavActions} from 'react-native-router-flux';
import MainToolbar from '../Components/MainToolbar';
import ListItem from '../Components/ListItem';
import I18n from '../I18n/I18n.js';
import Actions from '../Actions/Creators';
import {Colors, Metrics} from '../Themes';
import styles from './Styles/ProfileScreenStyle';

const {Answers} = Fabric;

class ProfileScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object
  };

  componentDidMount() {
    Answers.logContentView('Profile view', 'Screen view', 'profile');
  }

  fetchData = () => {
    const {dispatch} = this.props;
    dispatch(Actions.getProfile());
  }

  handlePressLogout = () => {
    const {dispatch} = this.props;
    dispatch(Actions.logout());
  }

  handlePressEditProfileName = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.modifyProfileName({profile, onDone: this.fetchData}));
  }

  handlePressEditPhone = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.modifyProfilePhone({profile, onDone: this.fetchData}));
  }

  handlePressEditProfileEmployeeId = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.modifyProfileEmployeeId({profile, onDone: this.fetchData}));
  }

  handlePressResetPassword = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.resetPassword());
  }

  /* 'Helpful links' section */
  handlePressPerkspotLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.perkspotInfo());
  }

  handlePressAdpLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.adpInfo());
  }

  handlePressWellsFargoLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.wellsfargoInfo());
  }

  handlePressGreatwestlifeLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.greatwestlifeInfo());
  }

  handlePressAmployeeassistanceLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.employeeAssistanceInfo());
  }

  renderProfileContainer() {
    const {profile} = this.props;
    const email = get(profile, 'email');
    const phone = get(profile, 'phone');
    const name = `${get(profile, 'first_name', '')} ${get(profile, 'last_name', '')}`;
    const employeeId = get(profile, 'employee_id');
    const employeeLocation = get(profile, 'employee_details.location.city');
    const employeeRegion = get(profile, 'employee_details.location.region.name');

    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.profileHeaderText}>{I18n.t('profile-userProfile')}</Text>
        </View>
        <ListItem label={I18n.t('profile-name')} value={name} chevron={true} onPress={this.handlePressEditProfileName} />
        <ListItem label={I18n.t('profile-phone')} value={phone} chevron={true} onPress={this.handlePressEditPhone} />
        <ListItem label={I18n.t('profile-email')} value={email} />
        <ListItem label={I18n.t('profile-employeeId')} value={employeeId} chevron={true} onPress={this.handlePressEditProfileEmployeeId} />
        <ListItem label={I18n.t('profile-employeeLocation')} value={employeeLocation} chevron={false} />
        <ListItem label={I18n.t('profile-employeeRegion')} value={employeeRegion} chevron={false} />
        <ListItem label={I18n.t('profile-resetPassword')} chevron={true} onPress={this.handlePressResetPassword} />
      </View>
    );
  }

  renderEmployeeAdminLinks() {
    const {profile} = this.props;
    const countryCode = toUpper(get(profile, 'employee_details.location.region.country_code'))
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.profileHeaderText}>{I18n.t('profile-employeeAdmin')}</Text>
        </View>
        <ListItem label={I18n.t('perkspot-link')} chevron={true} onPress={this.handlePressPerkspotLink} />
        {countryCode === 'US' && (
          <View>
            <ListItem label={I18n.t('adp-link')} chevron={true} onPress={this.handlePressAdpLink} />
            <ListItem label={I18n.t('wellsfargo-link')} chevron={true} onPress={this.handlePressWellsFargoLink} />
          </View>
        )}
        {countryCode === 'CA' && (
          <View>
            <ListItem label={I18n.t('greatwestlife-link')} chevron={true} onPress={this.handlePressGreatwestlifeLink} />
            <ListItem label={I18n.t('employeeassistance-link')} chevron={true} onPress={this.handlePressAmployeeassistanceLink} />
          </View>
        )}
      </View>
    );
  }

  renderLogoutButton() {
    return (
      <TouchableHighlight style={styles.logoutButtonContainer} onPress={this.handlePressLogout} underlayColor={Colors.lightGrey}>
        <Text style={styles.logoutButtonText}>{I18n.t('profile-logOut')}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const title = I18n.t('profile-title');
    return (
      <View style={styles.mainContainer}>
        <MainToolbar title={title} />
        <ScrollView
          contentContainerStyle={{paddingBottom: Metrics.scrollViewPaddingBottom}}
          style={styles.scrollView}
        >
          {this.renderProfileContainer()}
          {/*this.renderEmployeeAdminLinks()*/}
          {this.renderLogoutButton()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profileData
  }
};

export default connect(mapStateToProps)(ProfileScreen);
