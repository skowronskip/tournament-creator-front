import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
import { toast } from 'react-toastify';

export const userActions = {
    login,
    logout,
    getAll
};

function login(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                (user) => {
                    dispatch(success(user));
                    history.push('/');
                    toast.success('Logged in successfully', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                },
                (error) => {
                    dispatch(failure(error));
                    toast.error('Bad credentials', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
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
