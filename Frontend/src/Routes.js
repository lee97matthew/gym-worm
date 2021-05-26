import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Bookings from "./Bookings/Bookings";
import Profile from "./Profile/Profile";
import history from "./history";

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Home" exact component={Home} />
                    <Route path="/Bookings" component={Bookings} />
                    <Route path="/Profile" component={Profile} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;