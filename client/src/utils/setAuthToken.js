

import axios from 'axios';

//A token? added to the header
//no token? delete it from the heder


const setAuthToken = token => {

    //if there's a toekn we add it to the header
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;