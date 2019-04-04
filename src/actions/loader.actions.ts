import { loaderConstatns } from '../constants/loader.constants';
import { loaderService } from '../services/loader.service';
import { alertActions } from './alert.actions';

export const loaderActions = {
    loadBackendData
}
function loadBackendData() {
    return (dispatch: any) => {
        dispatch(request());

        loaderService.getAllGames()
            .then(
                (response: any) => {
                    dispatch(success(response));
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: loaderConstatns.LOADER_REQUEST }; }
    function success(response: any) { return { type: loaderConstatns.LOADER_SUCCESS, payload: response }; }
    function failure(error: any) { return { type: loaderConstatns.LOADER_FAILURE, payload: error }; }
}
