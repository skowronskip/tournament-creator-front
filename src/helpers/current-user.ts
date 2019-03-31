export interface User {
    email: string;
    id: number;
    login: string;
}

export function currentUser(): User | undefined {
    // return authorization header with jwt token
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;

    if (user && user.token) {
        return {
            email: user.email,
            id: user.id,
            login: user.login
        };
    }
}
