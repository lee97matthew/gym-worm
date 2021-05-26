import React, { Component } from 'react';
import { Avatar, Image, Input, Tooltip, Row, Space, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './Information.css'

class Information extends Component {
    render() {
        return(
            <div style={{background:"74828F", alignItems: "center"}}>
                <Row justify="center" style={{ padding: 20}}>
                    <Space direction="vertical" size={'large'} align='center'>
                        <Avatar style={{alignItems: 'center'}}
                            src={<Image src="https://i.chzbgr.com/full/9355435008/h67614A96/dish" />}
                            size={200}
                        />

                        <Input style={{ borderRadius: 35, width: 500}}
                            placeholder="Username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                        <Input style={{ borderRadius: 35, width: 500}}
                            placeholder="Email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                        <Input style={{ borderRadius: 35, width: 500}}
                            placeholder="Contact Number"
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />

                        <Button type="primary" shape="round" style={{background: "#96c0ce", width: 200, border: "none"}}>
                            Enter
                        </Button>
                    </Space>
                </Row>
            </div>
        )
    }
}

export default Information;