import {StyleSheet} from 'react-native';
import {Colors, ApplicationStyles, Metrics} from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
      ...ApplicationStyles.screen.mainContainer,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: Colors.transparent,
      height: Metrics.screenHeight - Metrics.statusBarHeight
  }
});
