import { combineReducers } from 'redux';

const testReducer = (state = 'test', action: any) => {
    return state;
};

export default combineReducers({
    testReducer,
});
