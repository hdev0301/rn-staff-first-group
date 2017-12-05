import {StyleSheet} from 'react-native';
import {Colors, Metrics, ApplicationStyles} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollView: {
    backgroundColor: Colors.lightGrey,
    height: Metrics.screenHeight - Metrics.mainToolbarHeight - Metrics.statusBarHeight - Metrics.tabBarHeight,
    marginBottom: Metrics.tabBarHeight
  },
  profileImageContainer: {
    paddingVertical: 30,
    backgroundColor: Colors.greyBlue
  },
  profileImage: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40
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
  studentsContainer: {
    flexDirection: 'column'
  },
  studentsHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.lightGrey
  },
  studentsHeaderText: {
    fontWeight: '500',
    color: Colors.darkerGrey
  },
  logoutButtonContainer: {
    height: 60,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.grey
  },
  logoutButtonText: {
    color: Colors.darkGrey,
    fontWeight: '600'
  }
})
