import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import {adminRoutes} from './routes'

import {connect} from 'react-redux'

import {Frame} from './components'

const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => {
  return {
    isLogin: state.user.isLogin
  }
}

@connect(mapState)
class App extends Component {
  render() {
    return (
      // 权限验证，根据redux里保存的数据， 登录后才能显示组件
      this.props.isLogin
      ?
      <Frame menus={menus}>
        <Switch>
            {
                adminRoutes.map(route => {
                    return (
                        <Route 
                            key={route.pathname} 
                            path={route.pathname} 
                            exact={route.exact}
                            render={(routeProps) => {
                            return <route.component {...routeProps} />
                        }} />
                    )
                })
            }
            {/* 默认重定向到第一个页面 */}
            <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
            <Redirect to="/404" />
        </Switch>
      </Frame>
      :
      <Redirect to="/login"></Redirect>
    )
  }
}

export default App
