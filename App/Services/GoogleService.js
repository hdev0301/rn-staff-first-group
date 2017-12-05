import {GoogleSignin} from 'react-native-google-signin';
import env from '../Config/Env';

export const googleLogout = () => {
  return new Promise(function(resolve, reject) {
    GoogleSignin
      .signOut()
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

export const getGoogleUserData = () => {
  return new Promise(function(resolve, reject) {
    GoogleSignin
      .signIn()
      .then(user => resolve(user))
      .catch(err => reject(err));
  });
}

export const googleSigninSetup = () => {
  return new Promise(function(resolve, reject) {
    GoogleSignin
      .hasPlayServices({autoResolve: true})
      .then(() => {
        return GoogleSignin.configure({
          iosClientId: env.google.iosClientId,
          webClientId: env.google.webClientId,
          offlineAccess: true
        })
      })
      .then(() => resolve())
      .catch(err => reject(err));
  });
}