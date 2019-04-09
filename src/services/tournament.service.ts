import { authHeader } from '../helpers/auth-header';

export const tournamentService = {
    createTournament,
    getMyTournaments,
    getOneTournament,
    createParticipant,
    changeTournamentState
};

function createTournament(name: string, game: {value: number}) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({tournament: {name, game_id: game.value }})
    };

    // @ts-ignore
    return fetch(`http://localhost:4000/api/v1/tournaments`, requestOptions)
        .then(handleResponse)
        .then((response: any) => {
            return response;
        });
}

function changeTournamentState(state: string, id: number) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({tournament: {state}})
    };

    // @ts-ignore
    return fetch(`http://localhost:4000/api/v1/tournaments/${id}`, requestOptions)
        .then(handleResponse)
        .then((response: any) => {
            return response;
        });
}

function createParticipant(name: string, tournament: number) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({participant: {name, tournament_id: tournament}})
    };

    // @ts-ignore
    return fetch(`http://localhost:4000/api/v1/participants`, requestOptions)
        .then(handleResponse)
        .then((response: any) => {
            return response;
        });
}

function getMyTournaments() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // @ts-ignore
    return fetch(`http://localhost:4000/api/v1/tournaments/myTournaments`, requestOptions)
        .then(handleResponse)
        .then((response: any) => {
            return response;
        });
}

function getOneTournament(id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // @ts-ignore
    return fetch(`http://localhost:4000/api/v1/tournaments/tournament/${id}`, requestOptions)
        .then(handleResponse)
        .then((response: any) => {
            return response;
        });
}

function handleResponse(response: { text: () => { then: (arg0: (text: any) => any) => void; }; ok: any; status: number; statusText: any; }) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
