import {tournamentConstants} from '../constants/tournament.constants';
import _ from 'lodash';

interface TournamentAction {
    type: tournamentConstants;
    payload: {
        tournament: Tournament;
        tournaments: Tournament[];
        participant: Participant;
        matches: Match[];
        match: Match;
    };
}
export interface Match {
    id: number;
    home_team_id: number;
    away_team_id: number;
    homePoints: number;
    awayPoints: number;
    state: string;
    tournament_id: number;
    match_no: number;
    round_no: number;
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
    matches: Match[];
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
    const updatedState = JSON.parse(JSON.stringify(state));
    const {currentTournament} = updatedState;
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
            if (currentTournament) {
                currentTournament.participants.push(action.payload.participant);
            }
            return updatedState;
        case tournamentConstants.TOURNAMENT_GENERATEMATCHES_SUCCESS:
            if (currentTournament) {
                currentTournament.matches = action.payload.matches;
            }
            return updatedState;
        case tournamentConstants.TOURNAMENT_CHANGESCORE_SUCCESS:
            if (currentTournament) {
                currentTournament.matches = _.map(currentTournament.matches, (match) => {
                    if (match.id === action.payload.match.id) {
                        return action.payload.match;
                    }
                    return match;
                });
            }
            return {
                ...state,
                currentTournament
            };
        default:
            return state;
    }
}
