import React from 'react'
import { Badge, Button, Card, Col, List, Progress, Row, Space, Typography } from 'antd'
import {
  CheckCircleOutlined,
  FormOutlined,
  MoreOutlined
} from '@ant-design/icons'
import { PpaIconButton } from './ppaIconButton'
import {
  getPpaTransactionColor,
  getPpaTransactionShow,
  getPpaTransactionTitle,
  PpaTransaction
} from '../lib/ppaTransaction'

interface ItemProps {
  transaction: PpaTransaction
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
      <PpaIconButton key={'complete'} icon={<CheckCircleOutlined />} />
    )
    const editButton = <PpaIconButton key={'edit'} icon={<FormOutlined />} />
    const moreButton = <PpaIconButton key={'more'} icon={<MoreOutlined />} />
    return (
      <List.Item actions={[completeButton, editButton, moreButton]}>
        <Space align={'center'}>
          <Badge color={getPpaTransactionColor(this.props.transaction)} />
          {getPpaTransactionTitle(this.props.transaction)}
          {getPpaTransactionShow(this.props.transaction)}
        </Space>
      </List.Item>
    )
  }
}
