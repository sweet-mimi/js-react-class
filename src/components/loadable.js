import React, { Component } from 'react'
// 懒加载原理
const Loadable = ({
    loader,
    loading: Loading
}) => {
    return class LoadableComponent extends Component {
        state = {
            LoadedComponent: null
        }
        componentDidMount() {
            loader()
                .then(res => {
                    this.setState({
                        LoadedComponent: res.default
                    })
                })
        }
        render() {
            const {LoadedComponent} = this.state
          return (
            LoadedComponent
            ?
            <LoadedComponent />
            :
            <Loading />
          )
        }
      }
}
export default Loadable
