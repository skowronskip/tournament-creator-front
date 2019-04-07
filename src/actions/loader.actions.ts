import _ from 'lodash';
import { loaderConstatns } from '../constants/loader.constants';
import { loaderService } from '../services/loader.service';
import { alertActions } from './alert.actions';
import { tournamentActions } from './tournament.actions';
import {currentUser} from '../helpers/current-user';

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
                    if (!_.isEmpty(currentUser())) {
                        dispatch(tournamentActions.getMyTournaments());
                    }
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
