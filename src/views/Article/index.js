import React, { Component } from 'react'

import { Card, Button, Table } from 'antd';

const dataSource = [ ];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
export default class Article extends Component {
  
  render() {
    return (
      <Card 
        title="文章列表" 
        bordered={false} 
        extra={<Button>导出</Button>}>
          <Table dataSource={dataSource} columns={columns} />;
      </Card>
    )
  }
}
