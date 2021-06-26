import React, { Component } from 'react';
import { Row, Space, Switch } from 'antd';
import 'antd/dist/antd.css';
import AuthService from "../../services/auth.service";


class Notif extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        function emailNotifChange(checked) {
            AuthService.updateEmailNotifications(currentUser.email, checked)
                .then(
                    (newUser) => {
                        //alert("Updated");
                        AuthService.updateCurrentUser(newUser.email, currentUser.password);
                        console.log("Successfully Updated");
                    },
                    error => {
                        alert("Unable to Update");
                        console.log("Unable to update " + error);
                        window.location.reload();
                    }
                );
        }

        function smsNotifChange(checked) {
            AuthService.updateSMSNotifications(currentUser.email, checked)
                .then(
                    (newUser) => {
                        //alert("Updated");
                        AuthService.updateCurrentUser(newUser.email, currentUser.password);
                        console.log("Successfully Updated");
                    },
                    error => {
                        alert("Unable to Update");
                        console.log("Unable to update " + error);
                        window.location.reload();
                    }
                );
        }

        function telegramNotifChange(checked) {
            AuthService.updateTelegramNotifications(currentUser.email, checked)
                .then(
                    (newUser) => {
                        //alert("Updated");
                        AuthService.updateCurrentUser(newUser.email, currentUser.password);
                        console.log("Successfully Updated");
                    },
                    error => {
                        alert("Unable to Update");
                        console.log("Unable to update " + error);
                        window.location.reload();
                    }
                );
        }

        return (
            <div style={{ background: "#74828F", alignItems: "center" }}>
                <Row justify="left" style={{ padding: 10 }}>
                    <Space direction="vertical" size={'large'} align='centlefter'>

                        <Switch
                            checkedChildren="Turn Off Email Notifcations"
                            unCheckedChildren="Turn On Email Notifications"
                            defaultChecked={currentUser.emailNotification}
                            onChange={emailNotifChange}
                        />

                        <Switch
                            checkedChildren="Turn Off SMS Notifcations"
                            unCheckedChildren="Turn On SMS Notifications"
                            defaultChecked={currentUser.contactNotification}
                            onChange={smsNotifChange}
                        />

                        <Switch
                            checkedChildren="Turn Off Telegram Notifcations"
                            unCheckedChildren="Turn On Telegram Notifications"
                            defaultChecked={currentUser.telegramNotification}
                            onChange={telegramNotifChange}
                        />

                    </Space>
                </Row>
            </div>
        )
    }
}

export default Notif;