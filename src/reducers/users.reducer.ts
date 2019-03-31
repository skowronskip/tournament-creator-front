import { userConstants } from '../constants/user.constants';

interface UsersAction {
    type: userConstants;
    users: [];
    error: string;
}

export function users(state = {}, action: UsersAction) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}
