import { authHeader } from '../helpers/auth-header';

export const tournamentService = {
    createTournament,
    getMyTournaments
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
