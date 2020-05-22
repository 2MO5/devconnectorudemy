//here goes the logic behind those actions. In fact that's what actions do, the logic behind the action

import axios from 'axios'; // this is where we make our requests
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';

import setAuthToken from '../utils/setAuthToken';

//LODAING THE Usere
export const loadUser = () => async dispatch => {
    //if there's a token in local storage we should send it
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {

        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}


//registering the user to the back

export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        //axios is used to send request fom the front to back
        const res = await axios.post('api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors; //assign the errors from the array to the variable error

        //if there's an error
        if (errors) {
            //For each error give the set alert like the following one
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

//Loggin a user


export const login = (email, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password }); //creating an object

    try {
        //axios is used to send request fom the front to back
        const res = await axios.post('api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        //if something goes wrong
        const errors = err.response.data.errors; //assign the errors from the array to the variable error

        //if there's an error
        if (errors) {
            //For each error give the set alert like the following one
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};


export const logout = () => dispatch => {

    //When this function calls forth the followings are dispatched aka fired!
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}