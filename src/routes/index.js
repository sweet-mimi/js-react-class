import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    Article,
    ArticleEdit,
    Notifications
} from '../views'

// 配置路由, 动态路由
export const mainRoutes = [{   // 不需要登录的路由 跟App同级
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRoutes = [{        // 需要登录的路由 
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'dashboard',
    isNav: true
},{
    pathname: '/admin/article',
    component: Article,
    exact: true,
    title: '文章列表',
    icon: 'menu',
    isNav: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑'
},{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: 'setting',
    isNav: true
},{
    pathname: '/admin/notification',
    component: Notifications,
    title: '通知中心'
}]