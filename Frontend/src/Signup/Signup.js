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

class Signup extends Component {
    handleRoute = () =>{ 
        history.push("/Profile");
    }

    emailState =  {
        emailInput: ""
    }

    emailInputHandler = (event) => {
        this.setState = ({
            emailInput: event.target.value
        })
        console.log(this.emailState.emailInput)
    }

    firstName = {
        firstNameInput: "",
    }

    firstNameInputHandler = (event) => {
        this.setState = ({
            firstNameInput: event.target.value
        })
        console.log(this.firstName.firstNameInput)
    }

    lastName = {
        lastNameInput: "",
    }

    lastNameInputHandler = (event) => {
        this.setState = ({
            lastNameInput: event.target.value
        })
        console.log(this.lastName.lastNameInput)
    }

    confirmPassword = {
        confirmPasswordInput: "",
    }

    confirmPasswordInputHandler = (event) => {
        this.setState = ({
            confirmPasswordInput: event.target.value
        })
        console.log(this.confirmPassword.confirmPasswordInput)
    }

    render() {
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input type="text" onChange={this.emailInputHandler} value={this.emailState.emailInput}/>
                </Form.Item>

                <Form.Item
                    label="FirstName"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First Name!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input type="text" onChange={this.firstNameInputHandler} value={this.firstName.firstNameInput}/>
                </Form.Item>

                <Form.Item
                    label="LastName"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First Name!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input type="text" onChange={this.lastNameInputHandler} value={this.lastName.lastNameInput}/>
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
                    <Input.Password onChange={this.confirmPasswordInputHandler} value={this.confirmPassword.confirmPasswordInput}/>
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
    }
}

export default Signup;