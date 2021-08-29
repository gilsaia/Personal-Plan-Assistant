import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, ClockCircleOutlined, ProjectOutlined, SettingOutlined } from '@ant-design/icons'
import Link from 'next/link'

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
          <Link href={'/'}><a>任务</a></Link>
        </Menu.Item>
        <Menu.Item key={'tomato'} icon={<ClockCircleOutlined />}>
          <Link href={'/tomato'}><a>番茄钟</a></Link>
        </Menu.Item>
        <Menu.Item key={'stats'} icon={<ProjectOutlined />}>
          统计
        </Menu.Item>
        <Menu.Item key={'setting'} icon={<SettingOutlined />}>设置</Menu.Item>
      </Menu>
    )
  }
}
