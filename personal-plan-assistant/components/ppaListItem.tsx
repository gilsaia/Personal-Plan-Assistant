import React from 'react'
import { Badge, Button, Card, Col, List, Row } from 'antd'
import {
  CheckCircleOutlined,
  FormOutlined,
  MoreOutlined
} from '@ant-design/icons'
import { PpaIconButton } from './ppaIconButton'
import { PpaTransaction } from '../pages/task'

interface ItemProps {
  transaction:PpaTransaction
}

interface ItemState {
  hover: boolean
}

const colorMap={
  'remind':'red',
  'mission':'orange',
  'task':'cyan'
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
      <PpaIconButton key={'complete'} icon={<CheckCircleOutlined/>}/>
    )
    const editButton=(
      <PpaIconButton key={'edit'} icon={<FormOutlined/>}/>
    )
    const moreButton=(
      <PpaIconButton key={'more'} icon={<MoreOutlined/>}/>
    )
    return (
      <List.Item
        actions={[
          completeButton,
          editButton,
          moreButton
        ]}
      >
        <Badge color={colorMap[this.props.transaction.category]} text={this.props.transaction.title} />
      </List.Item>
    )
  }
}
