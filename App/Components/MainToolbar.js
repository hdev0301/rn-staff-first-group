import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {get} from 'lodash';
import {Colors} from '../Themes';
import styles from './Styles/MainToolbarStyle';

class MainToolbar extends Component {
  static propTypes = {
    leftButton: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      onPress: PropTypes.func
    }),
    rightButton: PropTypes.string,
    title: PropTypes.string
  };

  renderLeftButton = () => {
    const {leftButton} = this.props;
    const icon = get(leftButton, 'icon');
    const text = get(leftButton, 'text');
    let leftButtonJsx;
    if (icon) {
      leftButtonJsx =  (
        <TouchableOpacity onPress={leftButton.onPress} style={styles.leftButtonTouch}>
          <Icon name={leftButton.icon} size={20} color={Colors.darkGrey}/>
        </TouchableOpacity>
      );
    } else if (text) {
      leftButtonJsx =  (
        <TouchableOpacity onPress={leftButton.onPress} style={styles.leftButtonTouch}>
          <Text style={styles.leftButtonText}>{leftButton.text}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.leftButtonContainer}>{leftButtonJsx}</View>;
  }

  renderTitle = () => {
    const {title} = this.props;
    return title ? <Text style={styles.title}>{title}</Text> : <View/>;
  }

  render() {
    return (
      <View style={styles.mainToolbarContainer}>
        <View style={styles.titleContainer}>{this.renderTitle()}</View>
        {this.renderLeftButton()}
      </View>
    )
  }
}

export default MainToolbar;
