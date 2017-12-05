import {StyleSheet} from 'react-native';
import {Colors} from '../../Themes/';

export default StyleSheet.create({
  modal: {
    alignItems: 'center'
  },
  modalContentButton: {
    flex: 1
  },
  backgroundImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch'
  },
  safetyMessageWrapper: {
    paddingTop: 160,
    paddingHorizontal: 30    
  },
  safetyMessage: {
    color: Colors.darkBlue,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  }
});
