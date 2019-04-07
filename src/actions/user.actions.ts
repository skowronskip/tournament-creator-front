import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
import { tournamentActions } from './tournament.actions';
import { history } from '../helpers/history';
import { toast } from 'react-toastify';

export const userActions = {
    login,
    logout,
    signup,
    getAll
};

function signup(email: string, password: string, login: string) {
    return (dispatch: any) => {
        dispatch(request({ email }));

        userService.signup(email, password, login)
            .then(
                (response: any) => {
                    dispatch(success(response));
                    history.push('/');
                    dispatch(alertActions.success(response.message));
                },
                (error) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user: any) { return { type: userConstants.SIGNUP_REQUEST, user }; }
    function success(response: any) { return { type: userConstants.SIGNUP_SUCCESS, response }; }
    function failure(error: any) { return { type: userConstants.SIGNUP_FAILURE, error }; }
}

function login(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                (user) => {
                    dispatch(success(user));
                    dispatch(tournamentActions.getMyTournaments());
                    history.push('/');
                    dispatch(alertActions.success('Logged in successfully'));
                },
                (error) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error('Bad credentials'));
                }
            );
    };

    function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return (dispatch: any) => {
        dispatch(request());

        userService.getAll()
            .then(
                (users: any) => dispatch(success(users)),
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST }; }
    function success(users: any) { return { type: userConstants.GETALL_SUCCESS, users }; }
    function failure(error: any) { return { type: userConstants.GETALL_FAILURE, error }; }
}
