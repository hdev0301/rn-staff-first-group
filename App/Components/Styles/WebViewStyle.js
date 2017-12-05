import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  webViewTab: {
    marginTop: 0,
    backgroundColor: Colors.lightGrey,
    height: Metrics.screenHeight - Metrics.mainToolbarHeight - Metrics.statusBarHeight - Metrics.tabBarHeight,
    marginBottom: Metrics.tabBarHeight
  },
  webView: {
    marginTop: 0,
    backgroundColor: Colors.lightGrey,
    height: Metrics.screenHeight - Metrics.mainToolbarHeight - Metrics.statusBarHeight,
    marginBottom: Metrics.tabBarHeight
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
