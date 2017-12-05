import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../Themes/';

export default StyleSheet.create({
  mainToolbarContainer: {
    height: Metrics.mainToolbarHeight,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.grey
  },
  leftButtonContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftButtonTouch: {
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftButtonText: {
    color: Colors.darkGrey,
    fontWeight: '600'
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  title: {
    fontSize: 17,
    color: Colors.darkGrey
  }
})
