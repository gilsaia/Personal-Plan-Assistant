import React, { CSSProperties } from 'react'
import { Button, FormInstance } from 'antd'
import { PpaTaskModal } from './ppaTaskModal'

interface ButtonModalProps {
  buttonText: string
  buttonStyle?: CSSProperties
}

interface ButtonModalState {
  visible: boolean
}

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

  handleOk() {
    this.setState({ visible: false })
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
