import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

export default () => {
    const store = createStore(
        reducers,
        applyMiddleware(...middlewares)
    );

    return { store };
};
