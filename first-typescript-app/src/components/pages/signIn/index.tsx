import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.scss';

export const SignIn = () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios
      .post('https://demo-api.it-shatle.by/auth/signIn', {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log('Response: ', response);
        if (response.status === 201) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.accessToken);
          history.push('/dashboard');
        }
      })
      .catch((err) => console.log('Error: ', err));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <div className="sign-in-page">
        <h1>Sign in</h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
          <p>
            Don't have an account? <Link to="/signUp">Go to Sign up</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
