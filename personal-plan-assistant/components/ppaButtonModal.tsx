import React, { CSSProperties } from 'react'
import { Button, FormInstance } from 'antd'
import { PpaTaskModal } from './ppaTaskModal'
import {
  constructMission,
  constructRemind,
  constructTask,
  PpaTransaction, translateTask
} from '../lib/ppaTransaction'
import { mutate } from 'swr'

interface ButtonModalProps {
  buttonText: string
  buttonStyle?: CSSProperties
}

interface ButtonModalState {
  visible: boolean
}

const fetchTask = (url: RequestInfo, item: Object) =>
  fetch(url, {
    body: JSON.stringify({ task: item }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {})

export class PpaButtonModal extends React.Component<
  ButtonModalProps,
  ButtonModalState
> {
  state = { visible: false }
  formRef = React.createRef<FormInstance>()

  constructor(props: ButtonModalProps) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  showModal() {
    this.setState({ visible: true })
  }

  async handleOk() {
    try {
      const values = await this.formRef.current!.validateFields()
      const task=translateTask(values)
      await fetchTask('/api/addTask',task)
      await mutate('/api/getTasks')
      this.setState({ visible: false })
    } catch (e) {}
  }

  handleCancel() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <>
        <Button
          type={'primary'}
          style={this.props.buttonStyle}
          onClick={this.showModal}
        >
          {this.props.buttonText}
        </Button>
        <PpaTaskModal
          title={'新建任务'}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          form={this.formRef}
        />
      </>
    )
  }
}
