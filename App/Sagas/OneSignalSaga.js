import {take, spawn} from 'redux-saga/effects';
import OneSignal from 'react-native-onesignal';
import Types from '../Actions/Types';

export function * watchSubscribeToOneSignal() {
    while (true) {
        yield take(Types.SUBSCRIBE_TO_ONE_SIGNAL);
        yield spawn(OneSignal.setSubscription, true);
    }
}
