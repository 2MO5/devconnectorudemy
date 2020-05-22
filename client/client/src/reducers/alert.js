import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    //destructuring to make things easy
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload]; //here the state is immutable. Need to have states that's already there
        // our new states must be added to these. Our data will be inside the payload which has properties

        case REMOVE_ALERT: // removing a specific alert by id and giving all the alerts that's available aka ones aren't equal to payload id
            return state.filter(alert => alert.id !== payload); // here it's the payload's id

        default:
            return state;
    }
}