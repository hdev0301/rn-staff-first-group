import {StyleSheet} from 'react-native';
import {Colors} from '../../Themes/';

export default StyleSheet.create({
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    flexDirection: 'row'
  },
  picker: {
    height: 24,
    color: Colors.darkGrey,
    position: 'absolute',
    left: 60,
    top: 10,
    right: 0,
    padding: 0
  },
  pickerImageContainer: {
    width: 45,
    height: 45,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
  },
  pickerTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  pickerText: {
    color: Colors.darkGrey,
    fontSize: 18,
    marginHorizontal: 15
  },
  pickerArrowContainer: {
    width: 45,
    height: 45,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderLeftWidth: 1,
    borderColor: Colors.grey
  },
  errorContainer: {
    paddingVertical: 5,
    alignItems: 'center'
  },
  errorText: {
    color: Colors.red
  }
})
