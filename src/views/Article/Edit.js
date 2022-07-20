import React, { Component } from 'react'

import {
  Form,
  Input,
  Button,
  Card,
} from 'antd';

@Form.create()
class Edit extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator
    } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
    };
    return (
      <Card 
        title="文章编辑" 
        bordered={false} 
        extra={<Button>取消</Button>}>
        <Form 
          {...formItemLayout}
          // labelCol={{
          //   span: 4
          // }}
          // wrapperCol={{
          //   span: 20
          // }}
          onSubmit={this.handleSubmit}>
          <Form.Item 
            label="title"
            >
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input your title',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="author">
            {getFieldDecorator('author', {
              rules: [
                {
                  required: true,
                  message: 'Please input your author',
                },
              ],
            })(<Input
                  placeholder='author'
               />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4
            }}>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}


export default Edit