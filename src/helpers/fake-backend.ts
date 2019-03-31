export function configureFakeBackend() {
    const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    const realFetch = window.fetch;
    interface User {
        id: number;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
    }
    window.fetch = (url, opts) => {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (typeof url !== 'string' || url.endsWith('/users/authenticate') && opts && opts.method === 'POST') {
                    // get parameters from post request
                    let params: User;
                    if (opts && typeof opts.body === 'string') {
                        params = JSON.parse(opts.body);
                    }

                    // find if any user matches login credentials
                    const filteredUsers = users.filter((user) => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        const user = filteredUsers[0];
                        const responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        // @ts-ignore
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    // @ts-ignore
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // @ts-ignore
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then((response) => resolve(response));

            }, 500);
        });
    };
}
