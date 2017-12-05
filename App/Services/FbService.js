import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

export const getFbAccessToken = () => new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then(
            result => {
                if (result.isCancelled) {
                    resolve(null);
                } else {
                    AccessToken.getCurrentAccessToken()
                        .then(data => resolve(data.accessToken))
                        .catch(error => reject(error));
                }
            }
        )
        .catch(error => reject(error));
});

export const getFbUserData = () => new Promise((resolve, reject) => {
    const infoRequest = new GraphRequest(
        '/me',
        {parameters: {}},
        (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }
    );
    infoRequest.addStringParameter('id,email,first_name,last_name', 'fields');
    new GraphRequestManager().addRequest(infoRequest).start();
});

export const fbLogout = () => LoginManager.logOut();
