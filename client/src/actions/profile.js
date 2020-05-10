import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';


//Getting the current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me'); //connecting with the backend

        dispatch({
            type: GET_PROFILE,
            payload: res.data //putting profiled data into our state
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.res.statusText, status: err.response.status }
        });
    }
} 