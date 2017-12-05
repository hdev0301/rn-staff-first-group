import {StyleSheet} from 'react-native';
import {Colors} from '../../Themes/';

export default StyleSheet.create({
  textInputContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    borderColor: Colors.grey,
    backgroundColor: Colors.white
  },
  textInput: {
    height: 44,
    color: Colors.darkGrey,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    fontSize: 18,
  },
  textInputImageContainer: {
    width: 45,
    height: 45,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
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
