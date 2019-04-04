import { alertConstants } from '../constants/alert.constatns';
interface AlertAction {
    type: alertConstants;
    message: string;
    payload: {};
}

export function alert(state = {}, action: AlertAction) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: alertConstants.SUCCESS,
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: alertConstants.ERROR,
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
