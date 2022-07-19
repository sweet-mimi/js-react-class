import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import {adminRoutes} from './routes'

import {Frame} from './components'

const menus = adminRoutes.filter(route => route.isNav === true)

export default class App extends Component {
  render() {
    return (
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
    )
  }
}
