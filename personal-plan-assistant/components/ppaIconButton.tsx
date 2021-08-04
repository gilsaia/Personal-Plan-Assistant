import React from 'react'
import { Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

interface IconButtonProps {
  icon:JSX.Element
  onClick?:React.MouseEventHandler<HTMLElement>
}

interface IconButtonState {
  hover: boolean
}

export class PpaIconButton extends React.Component<IconButtonProps, IconButtonState> {
  constructor(props:IconButtonProps) {
    super(props);
    this.handleMouseOver=this.handleMouseOver.bind(this);
    this.handleMouseLeave=this.handleMouseLeave.bind(this);
  }

  handleMouseOver(){
    this.setState({
      hover:true
    })
  }

  handleMouseLeave(){
    this.setState({
      hover:false
    })
  }

  state = {
    hover: false
  }
  render() {
    return (
      <Button
        type={'text'}
        key={'complete'}
        shape={'circle'}
        size={'small'}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.props.onClick}
        style={{color:this.state.hover?'#40a9ff':''}}
      >
        {this.props.icon}
      </Button>
    )
  }
}
