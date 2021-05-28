import React, { Component } from 'react';
import { Form, Input, Button, Row } from 'antd';
import 'antd/dist/antd.css';
import './Signup.css';
import history from './../history';
import img from "../loginPhoto.jpeg";
import axios from 'axios';

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

    constructor(props) {
        super(props);
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            creditScore: 0,
        };

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCreditScore = this.onChangeCreditScore.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeCreditScore(e) {
        this.setState({
            creditScore: e.target.value
        })
    }

    onSubmit(e) {
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            creditScore: this.state.creditScore,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
        
        alert("User Created");
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
                    <Input type="text" onChange={this.onChangeEmail} value={this.state.email}/>
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
                    <Input type="text" onChange={this.onChangeFirstName} value={this.state.firstName}/>
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
                    <Input type="text" onChange={this.onChangeLastName} value={this.state.lastName}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            minLength: 6,
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
                            minLength: 6,
                            message: 'Please confirm your password!',
                        },
                    ]}
                    style={{minWidth: 500}}
                >
                    <Input.Password onChange={this.onChangePassword} value={this.state.password}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={() => { 
                                this.onSubmit()
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