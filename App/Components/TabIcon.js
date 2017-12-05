import React, {PropTypes} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../Themes';
import styles from './Styles/TabIconStyle';

const TabIcon = ({selected, title, iconCode}) => {
  const color = selected ? Colors.darkGreen : Colors.darkGrey;
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIconText, {color}]}>
        {title}
      </Text>
      <Icon name={iconCode} size={20} color={color} />
    </View>
  );
}

TabIcon.propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
    iconCode: PropTypes.string
}

export default TabIcon;
