import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React from 'react';
import { LeftMenu } from '../../blocks/LeftMenu';
import './styles.scss';
import { NavBar } from '../NavBar';
import { type } from 'os';

const { Header, Content } = Layout;


export class PageWrapper extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <LeftMenu collapsed={this.state.collapsed} />
        <Layout className="site-layout">
          <NavBar collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
