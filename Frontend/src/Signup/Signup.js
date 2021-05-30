import React, { useEffect, useState } from 'react';
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
  
function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }
    
    const  onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmit = (e) =>  {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: confirmPassword,
            "roles": ["user"]
        }

        console.log(user);

        axios.post('http://localhost:5000/api/auth/signup', user)
            .then(res => console.log(res.data));
        
        alert("User Created");
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        setDisabled(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setDisabled(true);
    };

    useEffect(() => {
        if (firstName === ''  || lastName === '' || email === '' || password === '' ) {
            setDisabled(true);
        } else {
            if (password.length < 6 || confirmPassword !== password) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        }
    });
    
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                    {
                        type: "email",
                        message: "The input is not valid E-mail!"
                    }
                ]}
                style={{minWidth: 500}}
                
            >
                <Input type="text" onChange={onChangeEmail} value={email}/>
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
                <Input type="text" onChange={onChangeFirstName} value={firstName}/>
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
                <Input type="text" onChange={onChangeLastName} value={lastName}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                min={6}
                max={20}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        min: 6,
                        message: 'Your password should be more than 6 characters!'
                    }
                ]}
                style={{minWidth: 500}}
            >
                <Input.Password type="text" onChange={onChangePassword} value={password}/>
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                min={6}
                max={20}
                rules={[
                    {
                        required: true,
                        minLength: 6,
                        message: 'Please confirm your password!',
                    },
                    {
                        min: 6,
                        message: 'Your password should be more than 6 characters!'
                    },
                ]}
                style={{minWidth: 500}}
            >
                <Input.Password onChange={onChangeConfirmPassword} value={confirmPassword}/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" 
                        htmlType="submit" 
                        disabled={ disabled }
                        onClick={() => { 
                            onSubmit()
                            history.push('/Home')
                            window.location.reload(false);
                            }
                        }
                >
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

export default Signup;