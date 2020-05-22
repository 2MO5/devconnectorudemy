import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'; //we use conects for components to interact with the redux

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0
    && alerts.map(alert => (

        <div key={alert.id} className={`alert alert-${alert.alertType}`}>

            {alert.msg}

        </div>
    )); //looping through and returing jsx for each alert

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

//Getting the alert state
//mapping redux states to a component, so that we have access to it
const mapStateToProps = state => ({
    //whatever the prop we wanna call, here it's state.
    //And whatever we want fom the root reducer
    // we only have "alert" as the reducer

    alerts: state.alert // alerts is the state 
});


export default connect(mapStateToProps)(Alert);
