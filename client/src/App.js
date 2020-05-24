// This is the root of the tree

import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile.forms/CreateProfile";
import EditProfile from "./components/profile.forms/EditProfile";
import AddExperience from "./components/profile.forms/AddExperience";
import AddEducation from "./components/profile.forms/AddEducation";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  //when the state updates the following will keep running
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //here in the array if there are properties and if they get updated the useEffect will also be updated the each time those properties get updated 
  //we pass that empty array as the second argument to run an effect and clean it up once

  return (

    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              //here goes all the routes that we're going to use in our front end
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
