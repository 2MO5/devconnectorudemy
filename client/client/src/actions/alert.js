import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from "uuid";
//we need to dispatch more than one action

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {

    //getting a random id with uuid
    const id = uuid();
    //dispatcing the actions
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}
