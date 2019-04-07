import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { loader} from './loader.reducer';
import { tournament  } from './tournament.reducer';

// @ts-ignore
const rootReducer = combineReducers({authentication, users, alert, loader, tournament});

export default rootReducer;
