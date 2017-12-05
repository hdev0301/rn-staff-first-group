import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      marginTop: Metrics.statusBarHeight
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin
    }
  },
  component: {
    tabBar: {
      flexDirection: 'row',
      backgroundColor: Colors.white,
      borderBottomWidth: 1,
      borderColor: Colors.grey,
      height: Metrics.tabBarHeight,
      borderTopWidth: 1
    }
  }
};

export default ApplicationStyles;
