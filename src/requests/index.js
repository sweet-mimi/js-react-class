import axios from "axios";
import {message} from 'antd'
const isDev = process.env.NODE_ENV === 'development'

// RAP2 里生成 mock 数据
const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/304897' : ''
})

service.interceptors.request.use(req => {
    return req
})

service.interceptors.response.use(res => {
    if(res.data.code === 0) {
        return res.data
    } else {
        // 全局处理错误
        message.error(res.data.msg)
    }
})

// 获取文章列表
export const getArticleList = (offset, limited) => {
    return service({
        method: 'post',
        url: '/api/v1/articleList',
        data: {
            offset,
            limited
        }
    })
}

// 删除文章
export const deleteArticle = (id) => {
    return service({
        method: 'post',
        url: '/api/v1/article/delete/' + id
    })
}