export function authHeader() {
    // return authorization header with jwt token
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}
