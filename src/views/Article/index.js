import React, { Component } from 'react'

import moment from 'moment'
import * as XLSX from 'xlsx'

import { Card, Button, Table, Tag, Modal, Typography, message } from 'antd';

import { getArticleList, deleteArticle } from '../../requests'

const titleMap = {
  id: 'Id',
  title: '文章标题',
  author: '文章作者',
  amount: '阅读量',
  createTime: '创建时间'
}

export default class Article extends Component {
  state = {
    isLoading: false,
    dataSource: [],
    columns: [
      // {
      //   title: '',
      //   dataIndex: 'title',
      //   key: 'title',
      // },
      // {
      //   title: '文章作者',
      //   dataIndex: 'author',
      //   key: 'author',
      // },
      // {
      //   title: '阅读量',
      //   dataIndex: 'amount',
      //   key: 'amount',
      // },
      // {
      //   title: '操作',
      //   key: 'actios',
      //   render:(text, record, index) => {
      //     return (
      //       <button>编辑</button>
      //     )
      //   }
      // },
    ],
    total: 0,
    offset: 0,            // 从第多少个开始
    limited: 10
  }
  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if(item === 'amount') {
        return {
          title: titleMap[item],
          key: item,
          render: (text, record) => {
            return <Tag color={record.amount > 300 ? 'gold' : 'red'}>{record.amount}</Tag>
          }
        }
      }
      if(item === 'createTime') {
        return {
          title: titleMap[item],
          key: item,
          render: (text, record) => {
            return moment(record.createTime).format('YYYY-MM-DD hh:mm:ss')
          }
        }
      }
      return {
        title: titleMap[item],
        key: item,
        dataIndex: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render:(text, record) => {
        return ( 
          <Button.Group size='small'>
            <Button type="primary" onClick={() => this.toEdit(record.id)}>编辑</Button>
            <Button type="danger" onClick={this.deleteArticle.bind(this, record)}>删除</Button>
          </Button.Group>
        )
      }
    })
    return columns
  }

  toEdit = (id) => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  // 删除功能
  deleteArticle = (record) => {
    Modal.confirm({
      // content: `确定要删除${record.title}吗？`,
      title: '此操作不可逆， 请谨慎操作！！',
      content: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
      onOk:() => {
        deleteArticle(record.id).then((result) => {
          // console.log(result);
          message.success(result.msg)
          this.getArticles()
        }).catch(() => {

        })
      }
    })
  }

  getArticles = () => {
    this.setState({
      isLoading: true
    })
    getArticleList(this.state.offset, this.state.limited).then(result => {
      // console.log(result);
      let columnKeys = Object.keys(result.data.list[0])
      /*
        动态路由导航切换时，有axios请求时，快速点击导航按钮时，会有这样的情况：
        点到的页面开始加载异步请求了，但是又跳转走了，这时请求数据回来了，但组件页面销毁了，这时使用setState() 方法时没有展示数据的页面了，这时会报错.
        所以这样的情况可解决的办法是，先判断页面是否展示了，只能用 实例上的 updater中的isMounted()方法，
        这个方法只有在dom元素加载完成时为true， dom未加载和组件销毁后为false
        所以使用 setState()前先调用 this.updater.isMounted(this) 判断下, 如果未false 就不调用setState渲染页面了
      */
      // if(!this.updater.isMounted(this)) return
      this.setState({
        dataSource: result.data.list,
        total: result.data.total,
        columns: this.createColumns(columnKeys)
      })
    }).catch(() => {

    }).finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }
  onPageChange = (page, pageSize) => {
    this.setState({
      offset: (page - 1) * pageSize,
      limited: pageSize
    }, () => {
      this.getArticles()
    })
  }

  // 导出excel,只能导出当前页
  exportExcel = () => {
    // 组合数据，形成二维数组
    let data = [Object.keys(this.state.dataSource[0])]
    for(let i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createTime).format('YYYY-MM-DD hh:mm:ss')
      ])
    }
    /* 使用sheetjs-xlsx插件进行excel下载 */
    /* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(data);   // 这里需要传二维数组 如：[['a', 'b'],[1, 2]]
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `sheetjs-${moment().format('YYYYMMDDhhmmss')}.xlsx`)
  }
  componentDidMount() {
    this.getArticles()
  }
  render() {
    return (
      <Card 
        title="文章列表" 
        bordered={false} 
        extra={<Button onClick={this.exportExcel}>导出Excel</Button>}>
          <Table 
            loading={this.state.isLoading}
            rowKey={record => record.id}
            dataSource={this.state.dataSource} 
            columns={this.state.columns}
            pagination={{
              total: this.state.total,
              hideOnSinglePage: true,
              showQuickJumper: true,
              onChange: this.onPageChange
            }} />;
      </Card>
    )
  }
}
