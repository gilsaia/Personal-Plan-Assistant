import React from 'react'
import {
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Slider,
  Space,
  Typography
} from 'antd'
import moment from 'moment'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface TaskModalProps {
  title: string
  visible: boolean
  form: React.RefObject<FormInstance>
  handleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  handleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

interface TaskModalState {
  category: string
  enableDate: boolean
  enableMissionPeriod: boolean
  enableMissionUnlimited: boolean
}

export class PpaTaskModal extends React.Component<
  TaskModalProps,
  TaskModalState
> {
  state = {
    category: 'remind',
    enableDate: false,
    enableMissionPeriod: true,
    enableMissionUnlimited: false
  }

  constructor(props: TaskModalProps) {
    super(props)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onEnableDateChange = this.onEnableDateChange.bind(this)
    this.onEnableMissionPeriodChange =
      this.onEnableMissionPeriodChange.bind(this)
    this.onEnableMissionLimitChange = this.onEnableMissionLimitChange.bind(this)
  }

  onCategoryChange(e: RadioChangeEvent) {
    this.setState({ category: e.target.value })
  }

  onEnableDateChange(e: CheckboxChangeEvent) {
    this.setState({ enableDate: e.target.checked })
  }

  onEnableMissionPeriodChange(e: CheckboxChangeEvent) {
    this.setState({ enableMissionPeriod: e.target.checked })
  }

  onEnableMissionLimitChange(e: CheckboxChangeEvent) {
    this.setState({ enableMissionUnlimited: e.target.checked })
  }

  render() {
    const validateMessages = {
      required: '${label}是必选字段'
    }
    let remainList = <p>Wrong</p>
    if (this.state.category === 'remind') {
      remainList = (
        <>
          <Form.Item
            name={'title'}
            label={'提醒名'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'事件名称'} />
          </Form.Item>
          <Form.Item
            name={'enableDate'}
            label={'设置时间'}
            initialValue={this.state.enableDate}
            valuePropName={'checked'}
          >
            <Checkbox
              onChange={this.onEnableDateChange}
              defaultChecked={this.state.enableDate}
            />
          </Form.Item>
          <Form.Item name={'date'} label={'截止时间'}>
            <DatePicker showTime disabled={!this.state.enableDate} />
          </Form.Item>
        </>
      )
    } else if (this.state.category === 'mission') {
      remainList = (
        <>
          <Form.Item
            name={'title'}
            label={'任务名'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'事件名称'} />
          </Form.Item>
          <Form.Item
            name={'date'}
            label={'开始时间'}
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label={'任务量'}>
            <Space>
              <Form.Item
                name={'volume'}
                label={'任务量'}
                rules={[{ required: true }]}
                noStyle
                initialValue={1}
              >
                <InputNumber
                  min={1}
                  max={240}
                  disabled={this.state.enableMissionUnlimited}
                />
              </Form.Item>
              <Typography.Text>小时</Typography.Text>
              <Form.Item
                name={'unlimited'}
                valuePropName={'checked'}
                noStyle
                initialValue={this.state.enableMissionUnlimited}
              >
                <Checkbox
                  onChange={this.onEnableMissionLimitChange}
                  defaultChecked={this.state.enableMissionUnlimited}
                >
                  无上限
                </Checkbox>
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item
            name={'repeat'}
            label={'是否重复'}
            initialValue={this.state.enableMissionPeriod}
            valuePropName={'checked'}
          >
            <Checkbox
              onChange={this.onEnableMissionPeriodChange}
              defaultChecked={this.state.enableMissionPeriod}
            />
          </Form.Item>
          <Form.Item name={'period'} label={'周期'} initialValue={1}>
            <Slider
              min={1}
              max={32}
              tipFormatter={value => {
                return value + '天'
              }}
              marks={{
                1: '1天',
                4: '4天',
                7: '7天',
                14: '14天',
                21: '21天',
                32: '32天'
              }}
              disabled={!this.state.enableMissionPeriod}
            />
          </Form.Item>
        </>
      )
    } else if (this.state.category === 'task') {
      remainList = (
        <>
          <Form.Item
            name={'title'}
            label={'任务名'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'事件名称'} />
          </Form.Item>
          <Form.Item
            name={'date'}
            label={'开始时间'}
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label={'任务次数'}>
            <Space>
              <Form.Item
                name={'volume'}
                label={'任务次数'}
                rules={[{ required: true }]}
                noStyle
                initialValue={1}
              >
                <InputNumber
                  min={1}
                  max={240}
                  disabled={this.state.enableMissionUnlimited}
                />
              </Form.Item>
              <Typography.Text>次</Typography.Text>
              <Form.Item
                name={'unlimited'}
                valuePropName={'checked'}
                noStyle
                initialValue={this.state.enableMissionUnlimited}
              >
                <Checkbox
                  onChange={this.onEnableMissionLimitChange}
                  defaultChecked={this.state.enableMissionUnlimited}
                >
                  无上限
                </Checkbox>
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item
            name={'repeat'}
            label={'是否重复'}
            initialValue={this.state.enableMissionPeriod}
            valuePropName={'checked'}
          >
            <Checkbox
              onChange={this.onEnableMissionPeriodChange}
              defaultChecked={this.state.enableMissionPeriod}
            />
          </Form.Item>
          <Form.Item name={'period'} label={'周期'} initialValue={1}>
            <Slider
              min={1}
              max={32}
              tipFormatter={value => {
                return value + '天'
              }}
              marks={{
                1: '1天',
                4: '4天',
                7: '7天',
                14: '14天',
                21: '21天',
                32: '32天'
              }}
              disabled={!this.state.enableMissionPeriod}
            />
          </Form.Item>
        </>
      )
    }
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form
          validateMessages={validateMessages}
          name={'task'}
          ref={this.props.form}
          layout={'horizontal'}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          requiredMark={false}
        >
          <Form.Item
            name="category"
            label="类别"
            initialValue={this.state.category}
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
