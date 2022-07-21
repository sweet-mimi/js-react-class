import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

// 引入路由
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider as LanProvider } from 'antd' 

import App from './App'

import {mainRoutes} from './routes'

import store from './store'     // store全局传入

import './index.less'

render(
    // <App />
    <Provider store={store}>
        <LanProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path="/admin" render={(routeProps) => {
                    // 使用render是为了做权限验证， 登录后才能访问admin
                    return <App {...routeProps} />
                }}></Route>

                {
                    mainRoutes.map(route => {
                        return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
                    })
                }

                <Redirect to="/admin" from='/' exact></Redirect>
                <Redirect to="/404" />
            </Switch>
        </Router>
        </LanProvider>
    </Provider>
    ,document.querySelector('#root')
) 