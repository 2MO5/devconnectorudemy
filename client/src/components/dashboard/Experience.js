import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';



const Experience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <td key={exp.id}>
            <td>{exp.company}</td>
            <td className="hide-sm"> {exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'></Moment> -{' '}
                {
                    //if to date is null then show 'Now ' else the other else from date to whatever the to date is
                    exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <button className='btn btn-danger'>Delete</button>
        </td>


    ));
    return (
        <Fragment>

            <h2 className="my-2"> Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>  {experience}  </tbody>
            </table>
        </Fragment>


    )
}

Experience.propTypes = {

    experience: PropTypes.array.isRequired
}

export default Experience;
