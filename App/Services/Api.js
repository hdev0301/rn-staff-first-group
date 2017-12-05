import apisauce from 'apisauce';
import DeviceInfo from 'react-native-device-info';
import {isEmpty}from 'lodash';
import env from '../Config/Env';
import {Platform} from 'react-native';

const encodeRFC5987ValueChars = (str) => {
  return encodeURIComponent(str).
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    replace(/['()]/g, escape). // i.e., %27 %28 %29
    replace(/\*/g, '%2A').
    // The following are not required for percent-encoding per RFC5987,
    // so we can allow for a little better readability over the wire: |`^
    replace(/%(?:7C|60|5E)/g, unescape);
};

const create = (baseURL = env.baseApiUrl) => {
  const defaultConfig = {
    headers: {
      'FS-Client-Platform': Platform.OS,
      'FS-Client-Version': encodeRFC5987ValueChars(env.versionNumber),
      'FS-Client-Build': env.buildNumber
    }
  };

  const api = apisauce.create({
    baseURL,
    timeout: 10000
  });

  const authHeaders = (authToken) => {
    return {
      headers: {
        ...defaultConfig.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${authToken}`
      }
    };
  };

  const signIn = (email, password) => api.post('/sign-in', {
    email,
    password,
    device_name: DeviceInfo.getSystemName(),
    device_uid: DeviceInfo.getUniqueID()
  }, defaultConfig);

  const fbSignIn = (fbUid, fbAccessToken, firstName, lastName, email) => api.post('/fb-sign-in', {
    fb_uid: fbUid,
    fb_access_token: fbAccessToken,
    first_name: firstName,
    last_name: lastName,
    email,
    device_name: DeviceInfo.getSystemName(),
    device_uid: DeviceInfo.getUniqueID()
  }, defaultConfig);

  const googleSignIn = (id, idToken, accessToken, serverAuthCode, givenName, familyName, name, email, photo) => api.post('/google-signin', {
    extra: {
      raw_info: {
        email,
        name,
        family_name: familyName,
        given_name: givenName,
        picture: photo,
        sub: id
      }
    },
    id_token: idToken,
    access_token: accessToken,
    server_auth_code: serverAuthCode,
    device_name: DeviceInfo.getSystemName(),
    device_uid: DeviceInfo.getUniqueID()
  }, defaultConfig);

  const getToken = (email, loginToken) => api.post('/get-token', {
    email,
    login_token: loginToken
  }, defaultConfig);

  const register = (registrationData) => {
    const data = {
      first_name: registrationData.firstName,
      last_name: registrationData.lastName,
      email: registrationData.email,
      password: registrationData.password,
      password_confirmation: registrationData.passwordConfirmation
    };
    if (!isEmpty(registrationData.employeeId)) {
      data.employee_id = registrationData.employeeId;
    }
    return api.post('/register', data, defaultConfig);
  };

  const getProfile = (authToken) => api.get('/profile', null, authHeaders(authToken));

  const resetPassword = (email) => api.post('/password-reset', {email}, defaultConfig);

  const registerPush = (authToken, pushId) => api.post('/register-push', {
    push_id: pushId,
    platform: Platform.OS
  }, authHeaders(authToken));

  const updateProfile = (authToken, profileData) => api.patch('/profile', {
    first_name: profileData.firstName,
    last_name: profileData.lastName,
    phone: profileData.phone,
    employee_id: profileData.employeeId
  }, authHeaders(authToken));

  const addFeedback = (authToken, feedbackData) => api.post('/feedback', {
    category: feedbackData.category,
    message: feedbackData.message
  }, authHeaders(authToken));

  const addArticle = (authToken, articleData) => api.post('/articles', {
    title: articleData.title,
    full_article: articleData.fullArticle,
    notify_users: !!articleData.notifyUsers
  }, authHeaders(authToken));

  return {
    signIn,
    fbSignIn,
    googleSignIn,
    getToken,
    register,
    getProfile,
    resetPassword,
    registerPush,
    updateProfile,
    addFeedback,
    addArticle
  }
};

export default {
  create
}
