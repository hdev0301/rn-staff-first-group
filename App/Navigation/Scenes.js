import React from 'react';
import {Actions as NavActions, Scene, Switch} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {get} from 'lodash';

import StartupScreen from '../Components/StartupScreen';
import LoginScreen from '../Containers/LoginScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import MainScreen from '../Containers/MainScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import ModifyProfileNameScreen from '../Containers/ModifyProfileNameScreen';
import ModifyProfileEmployeeIdScreen from '../Containers/ModifyProfileEmployeeIdScreen';
import ModifyProfilePhoneScreen from '../Containers/ModifyProfilePhoneScreen';
import NewsfeedScreen from '../Containers/NewsfeedScreen';
import PublishScreen from '../Containers/PublishScreen';
import FeedbackScreen from '../Containers/FeedbackScreen';
import ResetPasswordScreen from '../Containers/ResetPasswordScreen';
import PerkspotScreen from '../Components/PerkspotScreen';
import AdpScreen from '../Components/AdpScreen';
import WellsfargoScreen from '../Components/WellsfargoScreen';
import GreatwestlifeScreen from '../Components/GreatwestlifeScreen';
import EmployeeAssistanceScreen from '../Components/EmployeeAssistanceScreen';
import TabIcon from '../Components/TabIcon';
import ApplicationStyles from '../Themes/ApplicationStyles';

const scenes = NavActions.create(
  <Scene key="root" component={MainScreen} >
    <Scene key="appScenes" hideNavBar={true} hideTabBar={true}>
      <Scene key="startup" initial={true} component={StartupScreen} />

      <Scene key="login" component={LoginScreen} />
      <Scene key="resetPassword" component={ResetPasswordScreen} />
      <Scene key="register" component={RegisterScreen} />

      <Scene key="modifyProfileName" component={ModifyProfileNameScreen} />
      <Scene key="modifyProfileEmployeeId" component={ModifyProfileEmployeeIdScreen} />
      <Scene key="modifyProfilePhone" component={ModifyProfilePhoneScreen} />

      <Scene key="perkspotInfo" component={PerkspotScreen} />
      <Scene key="adpInfo" component={AdpScreen} />
      <Scene key="wellsfargoInfo" component={WellsfargoScreen} />
      <Scene key="greatwestlifeInfo" component={GreatwestlifeScreen} />
      <Scene key="employeeAssistanceInfo" component={EmployeeAssistanceScreen} />

      <Scene
        key="tabBar"
        tabs={true}
        component={connect(state=>({profile: state.profile.profileData}))(Switch)}
        unmountScenes={true}
        selector={props => !!get(props, 'profile.permissions.editor') ? 'editor' : 'noEditor'}
      >
        <Scene key="editor" tabs={true} hideTabBar={false} tabBarStyle={ApplicationStyles.component.tabBar}>
          <Scene key="newsfeedEditor" title="Newsfeed" icon={TabIcon} component={NewsfeedScreen} hideNavBar={true} iconCode="rss" />
          <Scene key="publishEditor" title="Publish" icon={TabIcon} component={PublishScreen} hideNavBar={true} iconCode="plus" />
          <Scene key="feedbackEditor" title="Feedback" icon={TabIcon} component={FeedbackScreen} hideNavBar={true} iconCode="comment" />
          <Scene key="profileEditor" title="Profile" icon={TabIcon} component={ProfileScreen} hideNavBar={true} iconCode="user" />
        </Scene>
        <Scene key="noEditor" tabs={true} hideTabBar={false} tabBarStyle={ApplicationStyles.component.tabBar}>
          <Scene key="newsfeedNoEditor" title="Newsfeed" icon={TabIcon} component={NewsfeedScreen} hideNavBar={true} iconCode="rss" />
          <Scene key="feedbackNoEditor" title="Feedback" icon={TabIcon} component={FeedbackScreen} hideNavBar={true} iconCode="comment" />          
          <Scene key="profileNoEditor" title="Profile" icon={TabIcon} component={ProfileScreen} hideNavBar={true} iconCode="user" />
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);

export default scenes;
