import { tournamentConstants } from '../constants/tournament.constants';
import { tournamentService } from '../services/tournament.service';
import { alertActions } from './alert.actions';
import {history} from '../helpers/history';

export const tournamentActions = {
    createNewTournament,
    getMyTournaments
}
function createNewTournament(name: string, game: {value: number}) {
    return (dispatch: any) => {
        dispatch(request());

        tournamentService.createTournament(name, game)
            .then(
                (response: any) => {
                    dispatch(success(response));
                    history.push('/dashboard');
                    dispatch(alertActions.success('Tournament created!'));
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: tournamentConstants.TOURNAMENT_NEW_REQUEST }; }
    function success(response: any) { return { type: tournamentConstants.TOURNAMENT_NEW_SUCCESS, payload: {tournament: response }}; }
    function failure(error: any) { return { type: tournamentConstants.TOURNAMENT_NEW_FAILURE, payload: error }; }
}

function getMyTournaments() {
    return (dispatch: any) => {
        dispatch(request());

        tournamentService.getMyTournaments()
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

    function request() { return { type: tournamentConstants.TOURNAMENT_GETALL_REQUEST }; }
    function success(response: any) { return { type: tournamentConstants.TOURNAMENT_GETALL_SUCCESS, payload: {tournaments: response }}; }
    function failure(error: any) { return { type: tournamentConstants.TOURNAMENT_GETALL_FAILURE, payload: error }; }
}
