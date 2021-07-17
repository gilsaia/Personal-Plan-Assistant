import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, ProjectOutlined, SettingOutlined } from '@ant-design/icons'

interface MenuProps {
  defaultSelectedKey: string
}

export class PpaMenu extends React.Component<MenuProps, {}> {
  constructor(props: MenuProps) {
    super(props)
  }
  render() {
    return (
      <Menu
        mode={'inline'}
        defaultSelectedKeys={[this.props.defaultSelectedKey]}
      >
        <Menu.Item key={'tasks'} icon={<AppstoreOutlined />}>
          任务
        </Menu.Item>
        <Menu.Item key={'stats'} icon={<ProjectOutlined />}>
          统计
        </Menu.Item>
        <Menu.Item key={'setting'} icon={<SettingOutlined />}>设置</Menu.Item>
      </Menu>
    )
  }
}
