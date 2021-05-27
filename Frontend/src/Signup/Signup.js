import React, { Component } from 'react';
import { Form, Input, Button, Layout, Checkbox, Row } from 'antd';
import 'antd/dist/antd.css';
import './Signup.css';
import history from './../history';
import img from "../loginPhoto.jpeg";

const { Header, Footer, Sider, Content } = Layout;
document.body.style = 'background: #74828F;';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
  
const Demo = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

function Signup() {
    //const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/Profile");
  }
    //render() {
        return (
        <div style={{ display: 'flex'}}>
            <Row className="pos" type="flex" justify="center" align="center" verticalAlign="middle" >
            <h1 className="welcome">Registration</h1>
            <Form
                {...layout}
                name="basic"
                justify="center"
                initialValues={{
                    remember: true,
                }}
                onFinish={Demo.onFinish}
                onFinishFailed={Demo.onFinishFailed}
                >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={() => { 
                                history.push('/Home')
                                window.location.reload(false);
                            } }>
                        Register
                    </Button>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={() => { 
                                history.push('/')
                                window.location.reload(false);
                            } }>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            </Row>
        </div>
        )
    //}
}

export default Signup;