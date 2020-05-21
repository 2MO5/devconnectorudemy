
/*
import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


//here goes everything related to profile forms
//as this is a form, each input is a state
const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history }) => {

    const [formData, setFormData] = useState({
        //These are the form fiels
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''

    });


    //this is for the toggle state of the social network icons
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({// or ==> ||. so here loading or
            //loading or no profiel? Have a blank field or else (aka not loading and has a profile )show the profile
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,//checking whether there's a social object
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,

        });
    }, [loading]); // we want this to be run when loading

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;


    //...formData stands for the "rest of the" form data
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); //[e.target.name]: e.target.value => This will change it in the state


    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true); //we put a true because this is an edit
    }

    //Here we are returning the html and css
    //value={company} onChange={e => onChange(e)} <== this is used to do certain things on change. Here the form field is given access on change
    // it is that line of code the onChange _______ one allows you to bring it into the redux state
    return (

        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername} onChange={e => onChange(e)}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
            username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio"></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Add Social Network Links
                     </button>
                    <span>Optional</span>
                </div>


                {
                    //if the displaySocialInputs is true then show the followings in the fragment. Here the input is detect by the value and is chamged accordingly
                    displaySocialInputs && <Fragment>



                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" name="skills" value={twitter} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" name="skills" value={facebook} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" name="skills" value={youtube} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" name="skills" value={linkedin} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" name="skills" value={instagram} onChange={e => onChange(e)} />
                        </div>

                    </Fragment>

                }


                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>

        </Fragment>

    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired, //we pass this prop to the component up at the top there
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
*/