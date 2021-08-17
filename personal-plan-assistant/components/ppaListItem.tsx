import React from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  FormInstance,
  InputNumber,
  List,
  Popover,
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
  completeMission,
  completeTask,
  getPpaTransactionColor,
  getPpaTransactionShow,
  getPpaTransactionTitle,
  PpaTransaction,
  renewMission,
  renewTask,
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
  popVisible: boolean
  missionCompleteValue: number
  taskCompleteValue: number
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
  state = {
    item: this.props.transaction,
    modalVisible: false,
    popVisible: false,
    missionCompleteValue: 30,
    taskCompleteValue: 1
  }
  formRef = React.createRef<FormInstance>()

  constructor(props: ItemProps) {
    super(props)
    this.onTaskComplete = this.onTaskComplete.bind(this)
    this.onMissionComplete = this.onMissionComplete.bind(this)
    this.onTaskEdit = this.onTaskEdit.bind(this)
    this.onMissionCompleteValue = this.onMissionCompleteValue.bind(this)
    this.onTaskCompleteValue = this.onTaskCompleteValue.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handlePopVisible = this.handlePopVisible.bind(this)
  }

  async onTaskComplete() {
    let item = this.state.item
    item.complete = !item.complete
    this.setState({
      item: item
    })
    await fetchTask('/api/completeTask', item).catch(error => {
      console.log(error)
    })
    await mutate('/api/getTasks')
  }

  async onMissionComplete() {
    let item = this.state.item
    if (this.state.item.category === 'mission') {
      item = completeMission(this.state.item, this.state.missionCompleteValue)
      const newTask = renewMission(item)
      if (newTask) {
        await fetchTask('/api/addTask', newTask)
      }
    } else if (this.state.item.category === 'task') {
      item = completeTask(this.state.item, this.state.taskCompleteValue)
      const newTask = renewTask(item)
      if (newTask) {
        await fetchTask('/api/addTask', newTask)
      }
    }
    await fetchTask('/api/addTask', item)
    await mutate('/api/getTasks')
    this.setState({ item: item, popVisible: false })
  }

  onTaskEdit() {
    this.setState({ modalVisible: true })
  }

  onMissionCompleteValue(value: number) {
    console.log(value)
    value = Math.floor(value)
    this.setState({ missionCompleteValue: value })
  }

  onTaskCompleteValue(value: number) {
    value = Math.floor(value)
    this.setState({ taskCompleteValue: value })
  }

  async handleOk() {
    try {
      const values = await this.formRef.current!.validateFields()
      let task = translateTask(values)
      task.key = this.state.item.key
      task.complete = this.state.item.complete
      await fetchTask('/api/addTask', task)
      this.setState({ modalVisible: false, item: task })
    } catch (e) {}
  }

  handleCancel() {
    this.setState({ modalVisible: false })
  }

  handlePopVisible(visible: boolean) {
    this.setState({ popVisible: visible })
  }

  render() {
    let completeButton
    if (this.state.item.complete || this.state.item.category === 'remind') {
      completeButton = (
        <PpaIconButton
          key={'complete'}
          icon={<CheckCircleOutlined />}
          onClick={this.onTaskComplete}
        />
      )
    } else if (this.state.item.category === 'mission') {
      let popContent = (
        <>
          <Space>
            <Typography.Text>完成</Typography.Text>
            <InputNumber
              min={1}
              max={240}
              defaultValue={30}
              onChange={this.onMissionCompleteValue}
            />
            <Typography.Text>分钟</Typography.Text>
            <Button type={'primary'} onClick={this.onMissionComplete}>
              提交
            </Button>
          </Space>
        </>
      )
      completeButton = (
        <Popover
          content={popContent}
          title={'完成任务'}
          trigger={'click'}
          visible={this.state.popVisible}
          onVisibleChange={this.handlePopVisible}
        >
          <PpaIconButton key={'complete'} icon={<CheckCircleOutlined />} />
        </Popover>
      )
    } else if (this.state.item.category === 'task') {
      let popContent = (
        <>
          <Space>
            <Typography.Text>完成</Typography.Text>
            <InputNumber
              min={1}
              max={64}
              defaultValue={1}
              onChange={this.onTaskCompleteValue}
            />
            <Typography.Text>次</Typography.Text>
            <Button type={'primary'} onClick={this.onMissionComplete}>
              提交
            </Button>
          </Space>
        </>
      )
      completeButton = (
        <Popover
          content={popContent}
          title={'完成任务'}
          trigger={'click'}
          visible={this.state.popVisible}
          onVisibleChange={this.handlePopVisible}
        >
          <PpaIconButton key={'complete'} icon={<CheckCircleOutlined />} />
        </Popover>
      )
    }
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
