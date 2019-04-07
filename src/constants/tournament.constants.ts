export enum tournamentConstants {
    TOURNAMENT_NEW_REQUEST = 'TOURNAMENT_NEW_REQUEST',
    TOURNAMENT_NEW_SUCCESS = 'TOURNAMENT_NEW_SUCCESS',
    TOURNAMENT_NEW_FAILURE = 'TOURNAMENT_NEW_FAILURE',

    TOURNAMENT_GETALL_REQUEST = 'TOURNAMENT_GETALL_REQUEST',
    TOURNAMENT_GETALL_SUCCESS = 'TOURNAMENT_GETALL_SUCCESS',
    TOURNAMENT_GETALL_FAILURE = 'TOURNAMENT_GETALL_FAILURE',

    TOURNAMENT_GETONE_REQUEST = 'TOURNAMENT_GETONE_REQUEST',
    TOURNAMENT_GETONE_SUCCESS = 'TOURNAMENT_GETONE_SUCCESS',
    TOURNAMENT_GETONE_FAILURE = 'TOURNAMENT_GETONE_FAILURE',

    TOURNAMENT_ADDPARTICIPANT_REQUEST = 'TOURNAMENT_ADDPARTICIPANT_REQUEST',
    TOURNAMENT_ADDPARTICIPANT_SUCCESS = 'TOURNAMENT_ADDPARTICIPANT_SUCCESS',
    TOURNAMENT_ADDPARTICIPANT_FAILURE = 'TOURNAMENT_ADDPARTICIPANT_FAILURE',
}

export enum tournamentStates {
    STOPPED = 'stopped',
    PAUSED = 'paused',
    IN_PROGRESS = 'in_progress',
    FINISHED = 'finished'
}
