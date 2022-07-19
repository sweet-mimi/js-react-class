import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'   // 引入高阶组件，让本组件可以使用router方法

import { Layout, Menu, Icon } from 'antd'

const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
    handleClick = ({key}) => {
        this.props.history.push(key)
    }
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Header className="header" style={{ background: '#fff', borderBottom: '1px solid #c2c2c2' }}>
          <div className="logo" />
          标题
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[this.props.location.pathname]}
              defaultOpenKeys={['dashboard']}
              onClick={this.handleClick}
              style={{ height: '100%', borderRight: 0 }}>
                {
                    this.props.menus.map(route => {
                        return (
                            <Menu.Item key={route.pathname}>
                                <Icon type={route.icon} />
                                {route.title}
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px 24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame