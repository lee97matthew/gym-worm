import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
import history from './../history';

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

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        const user = {
            email: email,
            password: password,
        }

        console.log(user);

        /*axios.post('http://localhost:5000/users', user)
            .then(res => console.log(res.data));
        
        alert("User ");*/
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
        if (email === '' || password === '' ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    });

    return (
    <div style={{ display: 'flex'}}>
        <Row className="pos" type="flex" justify="center" align="center" verticalAlign="middle" >
        <h1 className="welcome">Welcome</h1>
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
                        message: 'Please input your email!',
                    },
                ]}
                style={{minWidth: 500}}
            >
                <Input type="text" onChange={onChangeEmail} value={email}/>
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
                <Input.Password type="text" onChange={onChangePassword} value={password}/>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" 
                        htmlType="submit" 
                        disabled={ disabled }
                        onClick={() => { 
                            onSubmit()
                            history.push('/Home')
                            window.location.reload(false);
                        } }>
                    Log in
                </Button>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={() => { 
                            history.push('/Signup')
                            window.location.reload(false);
                        } }>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
        </Row>
    </div>
    )
}

export default Login;