import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home/Home";
import Bookings from "./Bookings/Bookings";
import Profile from "./Profile/Profile";
import history from "./history";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

class Routes extends Component {
    render() {
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Bookings" component={Bookings} />
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Signup" component={Signup} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;