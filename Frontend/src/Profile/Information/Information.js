import React, { Component } from 'react';
import { Avatar, Image, Input, Tooltip, Row, Space, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './Information.css';
import history from "../../history";
import AuthService from "../../services/auth.service";

class Information extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div style={{ background: "74828F", alignItems: "center" }}>
                <Row justify="center" style={{ padding: 20 }}>
                    <Space direction="vertical" size={'large'} align='center'>
                        <Avatar style={{ alignItems: 'center' }}
                            src={<Image src="https://i.chzbgr.com/full/9355435008/h67614A96/dish" />}
                            size={200}
                        />

                        <Input style={{ borderRadius: 35, width: 500 }}
                            placeholder= {currentUser.firstName + " " + currentUser.lastName}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Name">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                        <Input style={{ borderRadius: 35, width: 500 }}
                            placeholder= {currentUser.email}
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Email">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                        <Input style={{ borderRadius: 35, width: 500 }}
                            placeholder= {currentUser.contactNo.substring(0,4) + " " + currentUser.contactNo.substring(4,8)}
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Contact Number">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                        <Button type="primary" shape="round" style={{ background: "#96c0ce", width: 200, border: "none" }}>
                            Update
                        </Button>

                        <Button
                            type="primary"
                            shape="round"
                            style={{ background: "#96c0ce", width: 200, border: "none", color: "red" }}
                            onClick={() => {
                                AuthService.logout();
                                history.push('/');
                                window.location.reload(false);
                            }}
                        >
                            Log Out
                        </Button>
                    </Space>
                </Row>
            </div>
        )
    }
}

export default Information;