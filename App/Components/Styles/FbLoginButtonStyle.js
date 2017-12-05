import {StyleSheet} from 'react-native';
import {Colors} from '../../Themes';

export default StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    backgroundColor: Colors.fbBlue,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.white
  }
});
