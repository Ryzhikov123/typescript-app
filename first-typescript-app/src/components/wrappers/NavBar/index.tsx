import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React from 'react';
import { PropsState } from '../../types/types';

const { Header } = Layout;

export const NavBar = ({ collapsed, toggle }: PropsState) => {
  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <Button onClick={signOut}>Sign out</Button>
    </Header>
  );
};
