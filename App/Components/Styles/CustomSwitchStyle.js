import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../Themes/';

export default StyleSheet.create({
  switchContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchLabel: {
    color: Colors.darkGrey,
    fontSize: 14,
    fontWeight: '500',
    paddingRight: 10
  },
  errorContainer: {
    paddingVertical: 5,
    alignItems: 'center'
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center'
  }
});
