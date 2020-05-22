//We need to make sure the profile is loadded. In case no profile is laaded, we load a silly spinographic
// The code related to that spinographic is this

import React, { Fragment } from 'react';
import spinner from './images/spinner_black.gif';


export default () => (
    <Fragment>

        <img
            src={spinner}
            style={{ width: '100px', margin: 'auto', display: 'block', position: 'absolute', top: '50%', left: '45%' }}
            alt='loading...'
        />
    </Fragment>
);

