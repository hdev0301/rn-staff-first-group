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
    paddingVertical: 25
  },
  passwordForgotLink: {
    textDecorationLine: 'underline',
    color: Colors.linkDarkBlue
  },
  loginLinkContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  loginLinkWrapper: {
    paddingLeft: 5
  },
  loginLink: {
    textDecorationLine: 'underline',
    color: Colors.linkDarkBlue
  },
  inputsContainer: {
    flexDirection: 'row'
  },
  inputsWrapper: {
    flex: 1
  },
  modal: {
    height: 100,
    width: Metrics.screenWidth - 40,
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.darkBlue
  },
  modalHeader: {
    height: 30,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalHeaderText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12
  },
  modalListRow: {
    borderColor: Colors.grey,
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  modalListRowText: {
    fontSize: 18,
    color: Colors.darkGrey
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
