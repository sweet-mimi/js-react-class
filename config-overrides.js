/**
 * @file config-overrides.js
 * @author
 * @introduce 基于customize和react-app-rewired的定制化配置文件
 */
const theme = require('./theme')
const { 
    override, 
    addDecoratorsLegacy,
    addLessLoader,
    fixBabelImports 
} = require('customize-cra')

module.exports = override(
    addDecoratorsLegacy(),            // 配置装饰器模式 需要安装 @babel/plugin-proposal-decorators
    addLessLoader({                     // 自定义主题需要用到 less 变量覆盖功能 引入 customize-cra 中提供的 less 相关的函数 addLessLoader 来帮助加载 less 样式
        javascriptEnabled: true,         // lessloader中配置js的enabled为true，否则less中的js不可用
        modifyVars: theme,             // 配置主题色
    }),
    fixBabelImports('import', {          //  babel-plugin-import是一个用于按需加载组件代码和样式的 babel 插件, 是用于antd组件的按需加载
        libraryName: 'antd',
        libraryDirectory: 'es',
         style: true,                   // 改成true是可以让less
    })
)