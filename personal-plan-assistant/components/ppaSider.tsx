import React from 'react'
import { Layout } from 'antd'
import { PpaMenu } from './ppaMenu'
import Image from 'next/image'
import logo from '../public/HatchfulExport-All/logo_transparent_cut.png'
import logo_word from '../public/HatchfulExport-All/logo_transparent_word.png'

const { Sider } = Layout

interface siderProps {
  defaultSelectedKey: string
}

interface siderState {
  collapsed: boolean;
  logo: StaticImageData;
}

export class PpaSider extends React.Component<siderProps, siderState> {
  state = {
    collapsed: false,
    logo:logo
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed: collapsed,logo:collapsed?logo_word:logo })
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
        <div className="logo">
          <Image src={this.state.logo} alt={'PPA'}/>
        </div>
        <PpaMenu defaultSelectedKey={this.props.defaultSelectedKey} />
      </Sider>
    )
  }
}
