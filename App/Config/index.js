import {Text} from 'react-native';
import DebugSettings from './DebugSettings';

export default () => {
  if (__DEV__) {
    // If ReactNative's yellow box warnings are too much, it is possible to turn
    // it off, but the healthier approach is to fix the warnings.  =)
    console.disableYellowBox = !DebugSettings.yellowBox
  }
}