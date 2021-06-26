import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Home from "./Home/Home";
import Bookings from "./Bookings/Bookings";
import Profile from "./Profile/Profile";
import history from "./history";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import MakeBookings from "./Bookings/MakeBookings"
//import BoardUser from "./components/board-user.component";
//import BoardAdmin from "./components/board-admin.component";

class Routes extends Component {
    /*constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }
    */
    render() {
        //const { currentUser, showAdminBoard } = this.state;
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/Home" component={AuthService.getCurrentUser() === null ? Login : Home} />
                    <Route path="/Bookings" component={AuthService.getCurrentUser() === null ? Login : Bookings} />
                    <Route path="/Profile" component={AuthService.getCurrentUser() === null ? Login : Profile} />
                    <Route path="/Signup" component={Signup} />
                    <Route path="/MakeBookings" component={AuthService.getCurrentUser() === null ? Login : MakeBookings} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;