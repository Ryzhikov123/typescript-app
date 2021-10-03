import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.scss';
const { Option } = Select;

export const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios
      .post('https://demo-api.it-shatle.by/auth/signup', {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        address: {},
        gender: values.gender,
        password: values.password,
        phone: values.phone,
      })
      .then((response) => {
        console.log('Response: ', response);
        if (response.status === 201) history.push('/signIn');
      })
      .catch((err) => console.log('Error: ', err));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  return (
    <div className="container">
      <div className="sign-up-page">
        <h1>Create account</h1>
        <p>
          Already have an account? <Link to="/signIn">Go to Sign In</Link>
        </p>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="name-info">
            <Form.Item
              // label="First Name"
              name="firstName"
              rules={[
                { required: true, message: 'Please input your First Name!' },
              ]}
            >
              <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
              // label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your Last Name!' },
              ]}
            >
              <Input placeholder='Last Name'/>
            </Form.Item>
          </div>
          <Form.Item
            // label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='E-mail'/>
          </Form.Item>
          <Form.Item
            // label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password'/>
          </Form.Item>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select gender"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            // label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input placeholder='Phone'/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
