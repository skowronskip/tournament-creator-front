import {tournamentConstants} from '../constants/tournament.constants';

interface TournamentAction {
    type: tournamentConstants;
    payload: {
        tournament: Tournament;
        tournaments: Tournament[];
        participant: Participant;
    };
}
export interface Participant {
    id: number;
    name: string;
}
export interface Tournament {
    name: string;
    id: number;
    game_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    participants: Participant[];
    state: string;
    type: number;
}

interface TournamentState {
    tournaments: Tournament[];
    currentTournament: Tournament | null;
}

const initialState: TournamentState = {
    tournaments: [],
    currentTournament: null,
};

export function tournament(state = initialState, action: TournamentAction) {
    switch (action.type) {
        case tournamentConstants.TOURNAMENT_NEW_SUCCESS:
            const updatedTournaments = state.tournaments;
            updatedTournaments.push(action.payload.tournament);
            initialState.tournaments = updatedTournaments;
            return initialState;
        case tournamentConstants.TOURNAMENT_GETALL_SUCCESS:
            return {
                ...state,
                tournaments: action.payload.tournaments
            };
        case tournamentConstants.TOURNAMENT_GETONE_SUCCESS:
            return {
                ...state,
                currentTournament: action.payload.tournament
            };
        case tournamentConstants.TOURNAMENT_CHANGESTATE_SUCCESS:
            return {
                ...state,
                currentTournament: action.payload.tournament
            };
        case tournamentConstants.TOURNAMENT_ADDPARTICIPANT_SUCCESS:
            const updatedState = {...state};
            const {currentTournament} = updatedState;
            if (currentTournament) {
                currentTournament.participants.push(action.payload.participant);
            }
            return updatedState;
        default:
            return state;
    }
}
