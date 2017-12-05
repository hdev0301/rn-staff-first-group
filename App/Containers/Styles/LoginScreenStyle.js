import {StyleSheet} from 'react-native';
import {Colors, Metrics, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollView: {
    paddingHorizontal: 30,
    backgroundColor: Colors.lightGrey
  },
  firstviewHeader: {
    backgroundColor: Colors.white,
    height: Metrics.firstviewBannerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.grey
  },
  firstviewHeaderImage: {
    width: 155,
    height: Metrics.firstviewHeaderImageHeight,
    paddingVertical: 10
  },
  titleTextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    height: Metrics.headerTitleHeight
  },
  titleText: {
    fontSize: 28,
    color: Colors.darkGrey
  },
  infoText: {
    fontSize: 14,
    color: Colors.darkGrey,
    marginTop: 15,
    marginBottom: 8
  },
  passwordForgotLinkContainer: {
    paddingTop: 25
  },
  passwordForgotLink: {
      textDecorationLine: 'underline',
      color: Colors.linkDarkBlue
  },
  registerLinkContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  registerLinkWrapper: {
      paddingLeft: 5
  },
  registerLink: {
      textDecorationLine: 'underline',
      color: Colors.linkDarkBlue
  },
  inputsContainer: {
      flexDirection: 'row'
  },
  inputsWrapper: {
      flex: 1
  },
  textInputContainer: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: Colors.grey,
      backgroundColor: Colors.white
  },
  textInput: {
    height: 24,
    color: Colors.darkGrey,
    position: 'absolute',
    left: 60,
    top: 10,
    right: 0,
    fontSize: 18,
    padding: 0
  },
  textInputImageContainer: {
     width: 45,
     height: 45,
     backgroundColor: Colors.grey,
     flex: 1,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     borderTopLeftRadius: 8,
     borderBottomLeftRadius: 8
  },
  textInputImage: {
    width: 25,
    height: 25
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 25
  },
  networkErrorInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: Colors.yellow
  },
  networkErrorInfoWrapper: {
    flex: 1
  },
  networkErrorInfoText: {
    fontSize: 13,
    color: Colors.darkestGrey,
    textAlign: 'center',
    fontWeight: '600'
  }
});
