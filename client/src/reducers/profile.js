

import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

// reducers is where all the data is REDUCED into a bit sized chunk and stored and shown in the redux store
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default:
            return state;


    }
}

