import {fork} from 'redux-saga/effects';
import Api from '../Services/Api';
import OneSignalApi from '../Services/OneSignalApi';
import {watchStartup} from './StartupSaga';
import {watchSubscribeToOneSignal} from './OneSignalSaga';
import {watchRegisterPush} from './PushSaga';
import {watchGetToken, watchLogout, watchLogin, watchFbLogin, watchGoogleLoginSetup, watchGoogleLogin} from './AuthSaga';
import {watchRegister} from './RegisterSaga';
import {watchGetProfile, watchUpdateProfile} from './ProfileSaga';
import {watchResetPassword} from './PasswordSaga';
import {watchAddFeedback} from './FeedbackSaga';
import {watchAddArticle} from './ArticleSaga';

// Create our API at this level and feed it into
// the sagas that are expected to make API calls
// so there's only 1 copy app-wide!
// const api = Api.create()
const api = Api.create();
const oneSignalApi = OneSignalApi.create();

// start the daemons
export default function * root() {
  yield fork(watchStartup)
  yield fork(watchSubscribeToOneSignal)
  yield fork(watchRegister.bind(null, api))
  yield fork(watchRegisterPush.bind(null, api))
  yield fork(watchLogin.bind(null, api))
  yield fork(watchFbLogin.bind(null, api))
  yield fork(watchGoogleLogin.bind(null, api))
  yield fork(watchGoogleLoginSetup)
  yield fork(watchLogout)
  yield fork(watchGetToken.bind(null, api))
  yield fork(watchGetProfile.bind(null, api))
  yield fork(watchUpdateProfile.bind(null, api))
  yield fork(watchResetPassword.bind(null, api))
  yield fork(watchAddFeedback.bind(null, api))
  yield fork(watchAddArticle.bind(null, api))
}
