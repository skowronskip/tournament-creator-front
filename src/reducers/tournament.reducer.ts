import { tournamentConstants } from '../constants/tournament.constants';

interface TournamentAction {
    type: tournamentConstants;
    payload: {
        tournament: Tournament;
        tournaments: Tournament[];
    };
}
export interface Tournament {
    name: string;
    id: number;
    game_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    participants: [];
    state: number;
    type: number;
}

interface TournamentState {
    tournaments: Tournament[];
}

const initialState: TournamentState = {
    tournaments: []
};

export function tournament(state = initialState, action: TournamentAction) {
    switch (action.type) {
        case tournamentConstants.TOURNAMENT_NEW_SUCCESS:
            const updatedTournaments = state.tournaments;
            updatedTournaments.push(action.payload.tournament);
            return {
                tournaments: updatedTournaments
            };
        case tournamentConstants.TOURNAMENT_GETALL_SUCCESS:
            return {
                tournaments: action.payload.tournaments
            };
        default:
            return state;
    }
}
