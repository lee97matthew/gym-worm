import React, { Component } from 'react';
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
  
const Demo = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

class Login extends Component{
    //const history = useHistory();
  
handleRoute = () =>{ 
    history.push("/Profile");
  }
    render() {
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
                onFinish={Demo.onFinish}
                onFinishFailed={Demo.onFinishFailed}
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

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={() => { 
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
}

export default Login;