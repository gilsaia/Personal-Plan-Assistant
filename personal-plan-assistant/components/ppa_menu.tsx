import React from 'react'
import { Menu } from 'antd'

export class Ppa_menu extends React.Component {
  render() {
    return (
      <Menu mode={'inline'}>
        <Menu.Item key={'tasks'}>任务</Menu.Item>
        <Menu.Item key={'stats'}>统计</Menu.Item>
        <Menu.Item key={'setting'}>设置</Menu.Item>
      </Menu>
    )
  }
}
