import { tournamentConstants } from '../constants/tournament.constants';
import { tournamentService } from '../services/tournament.service';
import { alertActions } from './alert.actions';
import {history} from '../helpers/history';

export const tournamentActions = {
    createNewTournament,
    getMyTournaments,
    getOneTournaments,
    createParticipant,
    changeTournamentState
};
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

function createParticipant(name: string, tournament: number) {
    return (dispatch: any) => {
        dispatch(request());

        tournamentService.createParticipant(name, tournament)
            .then(
                (response: any) => {
                    dispatch(success(response));
                    dispatch(alertActions.success('Team added!'));
                    dispatch(tournamentActions.getMyTournaments());
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: tournamentConstants.TOURNAMENT_ADDPARTICIPANT_REQUEST }; }
    function success(response: any) { return { type: tournamentConstants.TOURNAMENT_ADDPARTICIPANT_SUCCESS, payload: {participant: response }}; }
    function failure(error: any) { return { type: tournamentConstants.TOURNAMENT_ADDPARTICIPANT_FAILURE, payload: error }; }
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

function changeTournamentState(state: string, id: number) {
    return (dispatch: any) => {
        dispatch(request());

        tournamentService.changeTournamentState(state, id)
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

    function request() { return { type: tournamentConstants.TOURNAMENT_CHANGESTATE_REQUEST }; }
    function success(response: any) { return { type: tournamentConstants.TOURNAMENT_CHANGESTATE_SUCCESS, payload: {tournament: response }}; }
    function failure(error: any) { return { type: tournamentConstants.TOURNAMENT_ADDPARTICIPANT_FAILURE, payload: error }; }
}

function getOneTournaments(id: number) {
    return (dispatch: any) => {
        dispatch(request());

        tournamentService.getOneTournament(id)
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

    function request() { return { type: tournamentConstants.TOURNAMENT_GETONE_REQUEST }; }
    function success(response: any) { return { type: tournamentConstants.TOURNAMENT_GETONE_SUCCESS, payload: {tournament: response }}; }
    function failure(error: any) { return { type: tournamentConstants.TOURNAMENT_GETONE_FAILURE, payload: error }; }
}
