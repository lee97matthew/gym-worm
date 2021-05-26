import React, { Component } from 'react';
import {Row, Space, Switch } from 'antd';
import 'antd/dist/antd.css';

class Notif extends Component {
    render() {
        return(
            <div style={{background:"#74828F", alignItems: "center"}}>
            <Row justify="left" style={{ padding: 10}}>
                <Space direction="vertical" size={'large'} align='centlefter'>

                <Switch 
                    checkedChildren="Turn Off Website Notifcations" 
                    unCheckedChildren="Turn On Website Notifications" 
                    defaultChecked />

                <Switch 
                    checkedChildren="Turn Off Telegram Notifcations" 
                    unCheckedChildren="Turn On Telegram Notifications" 
                    defaultChecked />


                <Switch 
                    checkedChildren="Turn Off Message Notifcations" 
                    unCheckedChildren="Turn On Message Notifications" 
                    defaultChecked />       

                </Space>
            </Row>
        </div>
        )
    }
}

export default Notif;