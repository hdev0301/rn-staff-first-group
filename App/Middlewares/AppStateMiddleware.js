import {AppState} from 'react-native';
import Types from '../Actions/Types';
import {toLower} from 'lodash';

function createAppStateMiddleware() {
    let hasBeenTriggered = false;

    return ({dispatch, getState}) => next => action => {
        next(action);

        if (!hasBeenTriggered) {
            hasBeenTriggered = true;
            const handle = (appState) => dispatch({type: Types.APP_STATE, data: toLower(appState)});
            handle(AppState.currentState);
            AppState.addEventListener('change', handle);
        }
    };
}

const appStateMiddleware = createAppStateMiddleware();

export default appStateMiddleware;