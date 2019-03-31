import { userConstants } from '../constants/user.constants';

interface UserAction {
    type: userConstants;
    user: {};
}
const userItem = localStorage.getItem('user');
const user = userItem ? JSON.parse(userItem) : null;
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: UserAction) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
