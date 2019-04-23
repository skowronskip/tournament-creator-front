import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    signup,
    getAll
};

function login(email: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`http://api.tcreator.pskowron.ski/api/v1/users/login`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function signup(email: string, password: string, login: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, login })
    };

    return fetch(`http://api.tcreator.pskowron.ski/api/v1/users/register`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // @ts-ignore
    return fetch(`http://api.tcreator.pskowron.ski/users`, requestOptions).then(handleResponse);
}

function handleResponse(response: { text: () => { then: (arg0: (text: any) => any) => void; }; ok: any; status: number; statusText: any; }) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
