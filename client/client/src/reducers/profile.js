//reucers REDUCE the most important thing and give it to the browser
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from "../actions/types";

// reducers is where all the data is REDUCED into a bit sized chunk and stored and shown in the redux store that you see in the browser
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
        case UPDATE_PROFILE:
            return {
                ...state, //current states
                profile: payload,
                loading: false
            }

        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }

        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }

        default:
            return state;


    }
}

