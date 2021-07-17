import React from 'react'
import { Layout } from 'antd'
import { PpaMenu } from './ppaMenu'

const { Sider } = Layout

interface siderProps {
  defaultSelectedKey: string
}

interface siderState {
  collapsed: boolean
}

export class PpaSider extends React.Component<siderProps, siderState> {
  state = {
    collapsed: false
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed: collapsed })
  }
  render() {
    const { collapsed } = this.state
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        theme={'light'}
        width={200}
      >
        <div className="logo" />
        <PpaMenu defaultSelectedKey={this.props.defaultSelectedKey} />
      </Sider>
    )
  }
}
