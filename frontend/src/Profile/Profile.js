import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Information from "./Information/Information";
import Notif from "./Notif/Notif";
import Navbar from '../components/Navbar/Navbar';
import history from "../history";
import AuthService from "../services/auth.service";

const { Content, Sider } = Layout;

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            clicked: true
        };
    }

    //state = { clicked: true }

    handleClick = (theState) => {
        this.setState({ clicked: theState })
    }

    render() {
        const { currentUser } = this.state;
        if (!currentUser) {
            history.push('/');
            //window.location.reload();
        }

        return (
            <div style={{background:'#74828F'}}>
                <Navbar/>
                <Layout style={{background:'#74828F'}}>
                    <Sider style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        background:'#74828F',
                    }}>
                    <Menu style={{background:'#74828F', padding: 24}}>
                        <Menu.Item onClick={() => this.handleClick(true)}> Information </Menu.Item>
                        <Menu.Item onClick={() => this.handleClick(false)}> Notifications </Menu.Item>
                    </Menu>
                    </Sider>

                    <Layout style={{background:'#74828F', marginLeft: 200}}>
                        <Content style={{ margin: '24px 16px 100%', overflow: 'initial' }}>
                            <div style={{ padding: 20, minHeight: 360 }}>
                                {
                                    this.state.clicked ? <Information/> : <Notif/>
                                }
                            </div>
                        </Content>
                    </Layout>
            </Layout> 
            </div>
        );
    }
}

export default Profile;