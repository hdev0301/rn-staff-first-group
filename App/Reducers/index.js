import {combineReducers} from 'redux';
import StartupReducer from './StartupReducer';
import AppStateReducer from './AppStateReducer';
import LoginReducer from './LoginReducer';
import LoginPersistentReducer from './LoginPersistentReducer';
import RegisterReducer from './RegisterReducer';
import ProfileReducer from './ProfileReducer';
import SceneReducer from './SceneReducer';
import PasswordReducer from './PasswordReducer';
import OneSignalReducer from './OneSignalReducer';
import PushReducer from './PushReducer';
import FeedbackReducer from './FeedbackReducer';
import ArticleReducer from './ArticleReducer';

// glue all the reducers together into 1 root reducer
export default combineReducers({
  startup: StartupReducer,
  appState: AppStateReducer,
  login: LoginReducer,
  loginPersistent: LoginPersistentReducer,
  register: RegisterReducer,
  profile: ProfileReducer,
  scene: SceneReducer,
  password: PasswordReducer,
  oneSignal: OneSignalReducer,
  push: PushReducer,
  feedback: FeedbackReducer,
  article: ArticleReducer
});

// Put reducer keys that you want stored to persistence here
export const persistentStoreWhitelist = ['loginPersistent'];
