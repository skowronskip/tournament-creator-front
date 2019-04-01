import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// @ts-ignore
export const AnonymousRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user')
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
);
