import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../Themes';
import {min} from 'lodash';

export default StyleSheet.create({
  modal: {
    height: 210,
    paddingTop: 35,
    paddingHorizontal: 45,
    width: min([300, 0.8 * Metrics.screenWidth]),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    flexDirection: 'column'
  },
  modalMessage: {
    justifyContent: 'center',
    flex: 1
  },
  modalMessageText: {
    color: Colors.darkGrey,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 25
  }
});
