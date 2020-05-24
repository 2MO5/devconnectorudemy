import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile'; //bringing in the addExperince function

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        descrition: '',

    });


    const [toDateDisabled, toggleDisabled] = useState(false); //diabling to and toggle for the state false

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); //taking the keys aka targetting those variables

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add Your Education
      </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
        positions that you have had in the past
      </p>
            <small>* = required field</small>
            <form class="form" onSubmit={e => {
                e.preventDefault();
                addEducation(formData, history);
            }}>
                <div class="form-group">
                    <input type="text" placeholder="* School or bootcamp" name="school" value={school} onChange={e => onChange(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Degree or certificate" name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormData({ ...formData, current: !current });// give what ever the current is NOT plus other formdaata
                        toggleDisabled(!toDateDisabled); //togglediabled to what todatedisable is NOT
                        //if there's a current job we shouldn't be anle to add a 'to date'
                    }} /> {' '} Currenty enrolled</p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    {/*to value needed to be disabled if todate diable value is true*/}
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} /> //if disabled show or set this to 'disable' else keep it empty

                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description} onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,

}

export default connect(null, { addEducation })(withRouter(AddEducation));
