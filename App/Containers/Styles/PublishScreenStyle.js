import {StyleSheet} from 'react-native';
import {Colors, Metrics, ApplicationStyles} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollView: {
    backgroundColor: Colors.lightGrey,
    marginBottom: Metrics.tabBarHeight,
    paddingHorizontal: 0,
  },
  profileContainer: {
    flexDirection: 'column'
  },
  profileHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.lightGrey
  },
  profileHeaderText: {
    fontWeight: '500',
    color: Colors.darkerGrey
  },
  publishFormContainer: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  infoTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkGrey,
    textAlign: 'center'
  },
  inputsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  inputsWrapper: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
    paddingHorizontal: 20
  }
})
