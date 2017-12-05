import Types from './Types';

const startup = () => ({type: Types.STARTUP});
const initialized = () => ({type: Types.INITIALIZED});

const register = (registrationData) => ({type: Types.REGISTER, registrationData});
const registerSuccess = (message) => ({type: Types.REGISTER_SUCCESS, message});
const registerFailure = (errorCode, errors, message) => ({type: Types.REGISTER_FAILURE, errorCode, errors, message});
const clearRegistrationSuccessMessage = () => ({type: Types.CLEAR_REGISTRATION_SUCCESS_MESSAGE});

const login = (email, password) => ({type: Types.LOGIN, data: {email, password}});
const loginSuccess = (email, loginToken) => ({type: Types.LOGIN_SUCCESS, data: {email, loginToken}});
const loginFailure = (errorCode, errors, message, problem) => ({type: Types.LOGIN_FAILURE, data: {errorCode, errors, message, problem}});

const fbLogin = () => ({type: Types.FB_LOGIN});
const fbLoginSuccess = (email, loginToken) => ({type: Types.FB_LOGIN_SUCCESS, data: {email, loginToken}});
const fbLoginFailure = (errorCode, errors, message, problem) => ({type: Types.FB_LOGIN_FAILURE, data: {errorCode, errors, message, problem}});

const googleLogin = () => ({type: Types.GOOGLE_LOGIN});
const googleLoginSuccess = (email, loginToken) => ({type: Types.GOOGLE_LOGIN_SUCCESS, data: {email, loginToken}});
const googleLoginFailure = (errorCode, errors, message, problem) => ({type: Types.GOOGLE_LOGIN_FAILURE, data: {errorCode, errors, message, problem}});
const googleLoginCancel = () => ({type: Types.GOOGLE_LOGIN_CANCEL});

const googleLoginSetup = () => ({type: Types.GOOGLE_LOGIN_SETUP});
const googleLoginSetupSuccess = () => ({type: Types.GOOGLE_LOGIN_SETUP_SUCCESS});
const googleLoginSetupFailure = (errorCode, errors, message) => ({type: Types.GOOGLE_LOGIN_SETUP_FAILURE, data: {errorCode, errors, message}});

const getToken = (email, loginToken) => ({type: Types.GET_TOKEN, email, loginToken});
const getTokenSuccess = (email, authToken) => ({type: Types.GET_TOKEN_SUCCESS, email, authToken});
const getTokenFailure = (errorCode, problem) => ({type: Types.GET_TOKEN_FAILURE, errorCode, problem});

const logout = () => ({type: Types.LOGOUT});

const getProfile = () => ({type: Types.GET_PROFILE});
const getProfileSuccess = (profile) => ({type: Types.GET_PROFILE_SUCCESS, profile});
const getProfileFailure = (errorCode) => ({type: Types.GET_PROFILE_FAILURE, errorCode});

const resetPassword = (email) => ({type: Types.RESET_PASSWORD, email});
const resetPasswordSuccess = () => ({type: Types.RESET_PASSWORD_SUCCESS});
const resetPasswordFailure = (errorCode, errors, message) => ({type: Types.RESET_PASSWORD_FAILURE, errorCode, errors, message});

const registerPush = (pushId) => ({type: Types.REGISTER_PUSH, pushId});
const registerPushSuccess = () => ({type: Types.REGISTER_PUSH_SUCCESS});
const registerPushFailure = (errorCode, message) => ({type: Types.REGISTER_PUSH_FAILURE, errorCode, message});

const oneSignalIdsAvailable = (ids) => ({type: Types.ONE_SIGNAL_IDS_AVAILABLE, ids});
const subscribeToOneSignal = () => ({type: Types.SUBSCRIBE_TO_ONE_SIGNAL});

const updateProfile = (profileData) => ({type: Types.UPDATE_PROFILE, profileData});
const updateProfileSuccess = (profileData) => ({type: Types.UPDATE_PROFILE_SUCCESS, profileData});
const updateProfileFailure = (errorCode, errors, message) => ({type: Types.UPDATE_PROFILE_FAILURE, errorCode, errors, message});

const addFeedback = (feedbackData) => ({type: Types.ADD_FEEDBACK, data: feedbackData});
const addFeedbackSuccess = () => ({type: Types.ADD_FEEDBACK_SUCCESS});
const addFeedbackFailure = (errorCode, errors, message) => ({type: Types.ADD_FEEDBACK_FAILURE, data: {errorCode, errors, message}});

const addArticle = (articleData) => ({type: Types.ADD_ARTICLE, data: articleData});
const addArticleSuccess = () => ({type: Types.ADD_ARTICLE_SUCCESS});
const addArticleFailure = (errorCode, errors, message) => ({type: Types.ADD_ARTICLE_FAILURE, data: {errorCode, errors, message}});

/**
 Makes available all the action creators we've created.
 */
export default {
  startup,
  initialized,
  register,
  registerSuccess,
  registerFailure,
  clearRegistrationSuccessMessage,
  login,
  loginSuccess,
  loginFailure,
  fbLogin,
  fbLoginSuccess,
  fbLoginFailure,
  googleLoginSetup,
  googleLoginSetupSuccess,
  googleLoginSetupFailure,
  googleLogin,
  googleLoginSuccess,
  googleLoginFailure,
  googleLoginCancel,
  getToken,
  getTokenSuccess,
  getTokenFailure,
  logout,
  getProfile,
  getProfileSuccess,
  getProfileFailure,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  registerPush,
  registerPushSuccess,
  registerPushFailure,
  oneSignalIdsAvailable,
  subscribeToOneSignal,
  addFeedback,
  addFeedbackSuccess,
  addFeedbackFailure,
  addArticle,
  addArticleSuccess,
  addArticleFailure
}
