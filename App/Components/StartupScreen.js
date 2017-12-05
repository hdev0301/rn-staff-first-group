import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../Themes';
import styles from './Styles/StartupScreenStyle';

class StartupScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator color={Colors.darkBlue} animating={true} size={'large'}/>
      </View>
    );
  }
};

export default StartupScreen;
