import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'   // 引入高阶组件，让本组件可以使用router方法

import { connect } from 'react-redux'

import { Layout, Menu, Icon, Dropdown, Badge, Avatar } from 'antd'

const { Header, Content, Sider } = Layout

const mapState = state => {
  return {
    notificationCounts: state.notifications.list.filter(item => item.hasRead === false).length
  }
}

@connect(mapState)
@withRouter
class Frame extends Component {
    handleClick = ({key}) => {
        this.props.history.push(key)
    }
    menuClick = ({key}) => {
      this.props.history.push(key)
    }
    // menu = (           // 这里不需要改变的话就这样定义成静态的
    renderDropdownMenu = () => (          // 这里通知是需要改变的，所以定义成方法，每次改变可以重新渲染
      <Menu onClick={this.menuClick}>
        <Menu.Item key="/admin/notification">
          <Badge dot={this.props.notificationCounts > 0}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
            个人设置
        </Menu.Item>
        <Menu.Item key="/login">
            退出登录
        </Menu.Item>
      </Menu>
    )

  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Header className="header" style={{ background: '#fff', borderBottom: '1px solid #c2c2c2', display: 'flex', justifyContent: 'space-between' }}>
          <div className="logo" >
          标题
          </div>
          <Dropdown overlay={this.renderDropdownMenu()}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span>欢迎你</span>
              <Badge count={this.props.notificationCounts} offset={[-10, -10]}>
                <Icon type="down" />
              </Badge>
            </div>
          </Dropdown>
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