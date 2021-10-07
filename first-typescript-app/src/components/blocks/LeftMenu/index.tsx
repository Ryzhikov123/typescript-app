import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

type IProps = {
  collapsed: boolean;
};

const { Sider } = Layout;

export const LeftMenu = ({ collapsed }: IProps) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[window.location.pathname.slice(1)]}
      >
        <Menu.Item key="products" icon={<UserOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<VideoCameraOutlined />}>
          <Link to="/cart">Cart</Link>
        </Menu.Item>
        <Menu.Item key="order" icon={<UploadOutlined />}>
          <Link to="/order">Order</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
