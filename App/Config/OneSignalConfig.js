import OneSignal from 'react-native-onesignal';
import Actions from '../Actions/Creators';
import {Alert} from 'react-native';
import _ from 'lodash';

const configureOneSignal = (dispatch) => {
    OneSignal.configure({
        onIdsAvailable: (ids) => {
            dispatch(Actions.oneSignalIdsAvailable(ids))
        },
        onNotificationOpened: (message, data, isActive) => {
            const title = _.get(data, 'title');
            Alert.alert(title, message);
        }
    });
};

export default configureOneSignal;