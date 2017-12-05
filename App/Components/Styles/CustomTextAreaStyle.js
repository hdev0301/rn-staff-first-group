import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../Themes/';

export default StyleSheet.create({
  textInputContainer: {
    height: 106,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey,
    backgroundColor: Colors.white
  },
  textInput: {
    color: Colors.darkGrey,
    position: 'absolute',
    left: 15,
    top: 10,
    right: 15,
    bottom: 10,
    fontSize: 18
  },
  errorContainer: {
    paddingVertical: 5,
    alignItems: 'center'
  },
  errorText: {
    color: Colors.red
  }
});
