import { authHeader } from '../helpers/auth-header';

export const loaderService = {
    getAllGames
};

function getAllGames() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // @ts-ignore
    return fetch(`http://http://api.tcreator.pskowron.ski/api/v1/games`, requestOptions).then(handleResponse);
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
