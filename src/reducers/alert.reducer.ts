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
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
