import React from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  List,
  Progress,
  Row,
  Space,
  Typography
} from 'antd'
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
import { mutate } from 'swr'

interface ItemProps {
  transaction: PpaTransaction
}

interface ItemState {
  item: PpaTransaction
}

const fetchTask=(url:RequestInfo,item:PpaTransaction)=>fetch(url,{
  body:JSON.stringify({task:item}),
  method:'POST',
  headers: new Headers({
    'Content-Type':'application/json'
  })
}).then((res)=>{})

export class PpaListItem extends React.Component<ItemProps, ItemState> {
  state = {item:this.props.transaction}

  constructor(props: ItemProps) {
    super(props)
    this.onTaskComplete = this.onTaskComplete.bind(this)
  }
  onTaskComplete() {
    let item = this.state.item
    item.complete = !item.complete
    this.setState({
      item: item
    })
    fetchTask('/api/completeTask', item).catch((error)=>{
      console.log(error)
    })
  }
  render() {
    const completeButton = (
      <PpaIconButton
        key={'complete'}
        icon={<CheckCircleOutlined />}
        onClick={this.onTaskComplete}
      />
    )
    const editButton = <PpaIconButton key={'edit'} icon={<FormOutlined />} />
    const moreButton = <PpaIconButton key={'more'} icon={<MoreOutlined />} />
    return (
      <List.Item actions={[completeButton, editButton, moreButton]}>
        <Space align={'center'}>
          <Badge color={getPpaTransactionColor(this.state.item)} />
          {getPpaTransactionTitle(this.state.item)}
          {getPpaTransactionShow(this.state.item)}
        </Space>
      </List.Item>
    )
  }
}
