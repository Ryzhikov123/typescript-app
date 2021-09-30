import React from 'react';
import { Layout, Button } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export const DashboardPage = () => {
  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="dashboard-page">
      <Layout>
        <Header>
          <Button onClick={signOut}>Sign out</Button>
        </Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};
