/*
    使用路由懒加载 ，装插件 react-loadable
    自己写一个loading组件
*/
import Loadable from 'react-loadable'
import {Loading} from '../components'

// import Dashboard from "./Dashboard";
// import Login from "./Login";
// import NotFound from "./NotFound";
// import Settings from "./Settings";
// import Article from './Article'
// import ArticleEdit from './Article/Edit'
// 改造一下引入组件
const Dashboard = Loadable({
    loader: () => import("./Dashboard"),
    loading: Loading
})
const Login = Loadable({
    loader: () => import("./Login"),
    loading: Loading
})
const NotFound = Loadable({
    loader: () => import("./NotFound"),
    loading: Loading
})
const Settings = Loadable({
    loader: () => import("./Settings"),
    loading: Loading
})
const Article = Loadable({
    loader: () => import("./Article"),
    loading: Loading
})
const ArticleEdit = Loadable({
    loader: () => import("./Article/Edit"),
    loading: Loading
})


export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    Article,
    ArticleEdit
}