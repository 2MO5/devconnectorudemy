//this is our root reducer

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// It takes an object any reducer that we create
export default combineReducers({
    alert,
    auth
});