import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
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
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//creating or updating a profile which is dispatched aka shipped

export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        //calling the api aka the backend
        const res = await axios.post('api/profile', formData, config);

        //dispatching into the browse
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success')); //edited? give Profile Updated into the redux store else the other

        //creating a new profile? redirect to dashboard
        if (!edit) {
            history.push('/dashboard');
        }


    } catch (err) {

        //if something goes wrong like forgetting to add the data and things like that
        const errors = err.response.data.errors; //assign the errors from the array to the variable error

        //if there's an error
        if (errors) {
            //For each error give the set alert like the following one
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }


        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }

}

//Adding experience

export const addExperience = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        //calling the api aka connecting with the backend
        const res = await axios.put('api/profile/experience', formData, config);

        //dispatching into the browse
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success')); //edited? give Profile Updated into the redux store else the other


        history.push('/dashboard');



    } catch (err) {

        //if something goes wrong like forgetting to add the data and things like that
        const errors = err.response.data.errors; //assign the errors from the array to the variable error

        //if there's an error
        if (errors) {
            //For each error give the set alert like the following one
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }


        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Adding education

export const addEducation = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        //calling the api aka connecting with the backend
        const res = await axios.put('api/profile/education', formData, config);

        //dispatching into the browse
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education  Added', 'success')); //edited? give Profile Updated into the redux store else the other


        history.push('/dashboard');



    } catch (err) {

        //if something goes wrong like forgetting to add the data and things like that
        const errors = err.response.data.errors; //assign the errors from the array to the variable error

        //if there's an error
        if (errors) {
            //For each error give the set alert like the following one
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }


        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};