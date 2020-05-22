import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    }
}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"></img>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p> {/*&& is used for IF it's true statement*/}
                <p className="my-1">{location && <span> at {}</span>}</p> {/*&& is used for IF it's true statement*/}
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {/*Take skills from o to 4 and map their indexes to get them */}
                {skills.slice(0.4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                )
                )}
            </ul>


        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
