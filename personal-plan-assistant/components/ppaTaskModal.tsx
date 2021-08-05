import React from 'react'
import { DatePicker, Form, FormInstance, Input, Modal, Radio, RadioChangeEvent } from 'antd'
import moment from 'moment'

interface TaskModalProps {
  title: string
  visible: boolean
  form: React.RefObject<FormInstance>
  handleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  handleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

interface TaskModalState {
  category: string
}

export class PpaTaskModal extends React.Component<
  TaskModalProps,
  TaskModalState
> {
  state = { category: 'remind' }

  constructor(props: TaskModalProps) {
    super(props)
    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  onCategoryChange(e: RadioChangeEvent) {
    this.setState({ category: e.target.value })
  }

  render() {
    let remainList = <p>Wrong</p>
    if (this.state.category === 'remind') {
      remainList = (
        <>
          <Form.Item
            name={'title'}
            label={'提醒名'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'事件名称'}/>
          </Form.Item>
          <Form.Item name={'date'} label={'提醒时间'}>
            <DatePicker showTime/>
          </Form.Item>
        </>
      )
    } else if (this.state.category === 'mission') {
      remainList = <p>dfg</p>
    }
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form
          name={'task'}
          ref={this.props.form}
          layout={'horizontal'}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="category"
            label="类别"
            // rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Radio.Group
              defaultValue="remind"
              buttonStyle="solid"
              onChange={this.onCategoryChange}
            >
              <Radio.Button value="remind">提醒</Radio.Button>
              <Radio.Button value="mission">时间任务</Radio.Button>
              <Radio.Button value="task">数量任务</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {remainList}
        </Form>
      </Modal>
    )
  }
}
