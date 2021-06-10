import React, { Component } from 'react';
import { Layout, Row, Col, Space } from 'antd';
import 'antd/dist/antd.css';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import DisplayBookings from './DisplayBookings/DisplayBookings';
import Credits from './Credits/Credits';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const { Header, Content } = Layout;
document.body.style = 'background: #74828F;';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <Navbar />
                <Layout>
                    <Header className='theTitle'>
                        <p1>Hi {currentUser.firstName + " " + currentUser.lastName}</p1>
                    </Header>
                    <Content style={{ background: "#74828F" }}>
                        <Layout className='layout'>
                            <Row>
                                <Col span={12}>
                                    <Row align='center'>
                                        <Space direction="vertical" size={10} align='center'>
                                            <p1 className='textHome'>Your Bookings</p1>
                                            <DisplayBookings />
                                        </Space>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row align='center'>
                                        <Space direction="vertical" size={10} align='center'>
                                            <p1 className='textHome'>Your Credit</p1>
                                            <Credits></Credits>
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Home;