import React, { Component } from 'react'

import {connect} from 'react-redux'

import {Button, Card, List, Avatar, Badge, Spin} from 'antd'

import {markNotificationAsReadById, markAllNotificationAsRead} from '../../stores/actions/notifications'

const mapState = (state) => {
    const {
        list,
        isLoading
    } = state.notifications
    return {
        list,
        isLoading
    }
}

@connect(mapState, {markNotificationAsReadById, markAllNotificationAsRead})                             // react链接redux的高阶函数
class Notifitions extends Component {
  render() {
    return (
        <Spin spinning={this.props.isLoading}>
            <Card 
                title="通知中心" 
                extra={<Button 
                    disabled={this.props.list.every(item => item.hasRead===true)}
                    onClick={this.props.markAllNotificationAsRead.bind(this)}
                >全部标记已读</Button>}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                    <List.Item
                        extra={
                            item.hasRead 
                            ? 
                            null 
                            : 
                            <Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>标记已读</Button>}    
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                            description={item.desc}
                        />
                    </List.Item>
                    )}
                />
            </Card>
        </Spin>
    )
  }
}

export default Notifitions
