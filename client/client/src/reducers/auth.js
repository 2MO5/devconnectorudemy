import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
    //this is an object and it will have few thing. 1. Token
    token: localStorage.getItem('token'),// here we are accessing the token in the local storage
    isAuthenticated: null, //at first this should null as there no authentication done. This is the value allowing authenticate a user
    loading: true, // here the loading is refering to whether the front end request is loaded to the backend. If it's still "lodading", then it's true. Once loaded and backend is accessed, it is false. No more loading
    user: null
}


export default function (state = initialState, action) {

    //destructuring
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload //everything but the password
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token'); //removing the value for the token cuz registration is not done due to wrong information
            return {
                ...state,// we are passing the state
                token: null, //There's no value for the token
                isAuthenticated: false, // authenication won't work so false
                loading: false // But the front end has already loaded
            }



        default:
            return state;
    }

}