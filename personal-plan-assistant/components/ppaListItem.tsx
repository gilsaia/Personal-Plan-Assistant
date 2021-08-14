import React from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  FormInstance,
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
  antiTranslateTask,
  getPpaTransactionColor,
  getPpaTransactionShow,
  getPpaTransactionTitle,
  PpaTransaction,
  translateTask
} from '../lib/ppaTransaction'
import { mutate } from 'swr'
import { PpaTaskModal } from './ppaTaskModal'

interface ItemProps {
  transaction: PpaTransaction
}

interface ItemState {
  item: PpaTransaction
  modalVisible: boolean
}

const fetchTask = (url: RequestInfo, item: PpaTransaction) =>
  fetch(url, {
    body: JSON.stringify({ task: item }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {})

export class PpaListItem extends React.Component<ItemProps, ItemState> {
  state = { item: this.props.transaction, modalVisible: false }
  formRef = React.createRef<FormInstance>()

  constructor(props: ItemProps) {
    super(props)
    this.onTaskComplete = this.onTaskComplete.bind(this)
    this.onTaskEdit = this.onTaskEdit.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  onTaskComplete() {
    let item = this.state.item
    item.complete = !item.complete
    this.setState({
      item: item
    })
    fetchTask('/api/completeTask', item).catch(error => {
      console.log(error)
    })
  }

  onTaskEdit() {
    this.setState({ modalVisible: true })
  }

  async handleOk() {
    try {
      const values = await this.formRef.current!.validateFields()
      let task=translateTask(values)
      task.key=this.state.item.key
      await fetchTask('/api/addTask',task)
      await mutate('/api/getTasks')
      this.setState({ modalVisible: false })
    } catch (e) {}
  }

  handleCancel() {
    this.setState({ modalVisible: false })
  }

  render() {
    const completeButton = (
      <PpaIconButton
        key={'complete'}
        icon={<CheckCircleOutlined />}
        onClick={this.onTaskComplete}
      />
    )
    const editButton = (
      <PpaIconButton
        key={'edit'}
        icon={<FormOutlined />}
        onClick={this.onTaskEdit}
      />
    )
    const moreButton = <PpaIconButton key={'more'} icon={<MoreOutlined />} />
    return (
      <List.Item actions={[completeButton, editButton, moreButton]}>
        <Space align={'center'}>
          <Badge color={getPpaTransactionColor(this.state.item)} />
          {getPpaTransactionTitle(this.state.item)}
          {getPpaTransactionShow(this.state.item)}
        </Space>
        <PpaTaskModal
          title={'编辑任务'}
          visible={this.state.modalVisible}
          form={this.formRef}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          task={this.state.item}
        />
      </List.Item>
    )
  }
}
