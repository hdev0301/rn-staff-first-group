import {StyleSheet} from 'react-native';
import {Colors} from '../../Themes/';

export default StyleSheet.create({
  listItemContainer: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    justifyContent: 'space-between'
  },
  listItemLabelContainer: {
  },
  listItemLabelText: {
    color: Colors.darkGrey,
    fontWeight: '600'
  },
  listItemSecondLabelText: {
    color: Colors.darkerGrey,
    fontWeight: '400',
    fontSize: 12
  },
  listItemValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  listItemValueText: {
    color: Colors.darkerGrey,
    fontWeight: '400',
    marginHorizontal: 10
  }
})
