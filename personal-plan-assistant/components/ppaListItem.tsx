import React from 'react'
import { Badge, Button, Card, Col, List, Row } from 'antd'
import {
  CheckCircleOutlined,
  FormOutlined,
  MoreOutlined
} from '@ant-design/icons'
import { PpaIconButton } from './ppaIconButton'

interface ItemProps {
  category: string
}

interface ItemState {
  hover: boolean
}

export class PpaListItem extends React.Component<ItemProps, ItemState> {
  state = {
    hover: false
  }

  constructor(props: ItemProps) {
    super(props)
    this.onMouseEnter = this.onMouseEnter.bind(this)
  }
  onMouseEnter() {
    this.setState({ hover: true })
  }
  render() {
    const completeButton = (
      <PpaIconButton/>
    )
    return (
      <List.Item
        actions={[
          completeButton,
          <FormOutlined key={'edit'} />,
          <MoreOutlined key={'more'} />
        ]}
      >
        <Badge color={'red'} text={'cx'} />
      </List.Item>
    )
  }
}
