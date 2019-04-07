import { loaderConstatns } from '../constants/loader.constants';

interface LoaderAction {
    type: loaderConstatns;
    payload: {};
}

export interface Game {
    id: number;
    name: string;
    code: string;
}
const initialState = {
    loaded: false,
    games: []
};

export function loader(state = initialState, action: LoaderAction) {
    switch (action.type) {
        case loaderConstatns.LOADER_SUCCESS:
            return {
                loaded: true,
                games: action.payload
            };
        default:
            return state;
    }
}
