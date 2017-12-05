import {StyleSheet} from 'react-native';
import {Colors, Metrics, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollView: {
    paddingHorizontal: 30,
    backgroundColor: Colors.lightGrey
  },
  infoTextContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  infoText: {
    fontSize: 14,
    color: Colors.darkGrey,
    textAlign: 'center'
  },
  inputsContainer: {
    flexDirection: 'row'
  },
  inputsWrapper: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 25
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
  link: {
    textDecorationLine: 'underline',
    color: Colors.linkDarkBlue,
    textAlign: 'center'
  }
});
