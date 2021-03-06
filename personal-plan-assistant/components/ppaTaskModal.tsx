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
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { antiTranslateTask, PpaTransaction } from '../lib/ppaTransaction'

interface TaskModalProps {
  title: string
  visible: boolean
  form: React.RefObject<FormInstance>
  handleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  handleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  task?: PpaTransaction
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
  // state = {
  //   category: 'remind',
  //   enableDate: false,
  //   enableMissionPeriod: true,
  //   enableMissionUnlimited: false
  // }

  constructor(props: TaskModalProps) {
    super(props)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onEnableDateChange = this.onEnableDateChange.bind(this)
    this.onEnableMissionPeriodChange =
      this.onEnableMissionPeriodChange.bind(this)
    this.onEnableMissionLimitChange = this.onEnableMissionLimitChange.bind(this)
    this.setFieldValue=this.setFieldValue.bind(this)
    if(this.props.task){
      const values=antiTranslateTask(this.props.task)
      this.state={
        category:values.category,
        enableDate:values.enableDate,
        enableMissionPeriod:values.repeat,
        enableMissionUnlimited:values.unlimited
      }
    }else{
      this.state={
        category:'remind',
        enableDate:false,
        enableMissionPeriod:true,
        enableMissionUnlimited:false
      }
    }
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

  setFieldValue(): any {
    if (this.props.task) {
      return antiTranslateTask(this.props.task)
    }
    return null
  }

  render() {
    const values = this.setFieldValue()
    const validateMessages = {
      required: '${label}???????????????'
    }
    let remainList = <p>Wrong</p>
    if (this.state.category === 'remind') {
      remainList = (
        <>
          <Form.Item
            name={'title'}
            label={'?????????'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'????????????'} />
          </Form.Item>
          <Form.Item
            name={'enableDate'}
            label={'????????????'}
            initialValue={this.state.enableDate}
            valuePropName={'checked'}
          >
            <Checkbox onChange={this.onEnableDateChange} />
          </Form.Item>
          <Form.Item name={'date'} label={'????????????'}>
            <DatePicker showTime disabled={!this.state.enableDate} />
          </Form.Item>
        </>
      )
    } else if (this.state.category === 'mission') {
      remainList = (
        <>
          <Form.Item
            name={'title'}
            label={'?????????'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'????????????'} />
          </Form.Item>
          <Form.Item
            name={'date'}
            label={'????????????'}
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label={'?????????'}>
            <Space>
              <Form.Item
                name={'volume'}
                label={'?????????'}
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
              <Typography.Text>??????</Typography.Text>
              <Form.Item
                name={'unlimited'}
                valuePropName={'checked'}
                noStyle
                initialValue={this.state.enableMissionUnlimited}
              >
                <Checkbox onChange={this.onEnableMissionLimitChange}>
                  ?????????
                </Checkbox>
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item
            name={'repeat'}
            label={'????????????'}
            initialValue={this.state.enableMissionPeriod}
            valuePropName={'checked'}
          >
            <Checkbox onChange={this.onEnableMissionPeriodChange} />
          </Form.Item>
          <Form.Item name={'period'} label={'??????'} initialValue={1}>
            <Slider
              min={1}
              max={32}
              tipFormatter={value => {
                return value + '???'
              }}
              marks={{
                1: '1???',
                4: '4???',
                7: '7???',
                14: '14???',
                21: '21???',
                32: '32???'
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
            label={'?????????'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'????????????'} />
          </Form.Item>
          <Form.Item
            name={'date'}
            label={'????????????'}
            rules={[{ required: true }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label={'????????????'}>
            <Space>
              <Form.Item
                name={'volume'}
                label={'????????????'}
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
              <Typography.Text>???</Typography.Text>
              <Form.Item
                name={'unlimited'}
                valuePropName={'checked'}
                noStyle
                initialValue={this.state.enableMissionUnlimited}
              >
                <Checkbox onChange={this.onEnableMissionLimitChange}>
                  ?????????
                </Checkbox>
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item
            name={'repeat'}
            label={'????????????'}
            initialValue={this.state.enableMissionPeriod}
            valuePropName={'checked'}
          >
            <Checkbox onChange={this.onEnableMissionPeriodChange} />
          </Form.Item>
          <Form.Item name={'period'} label={'??????'} initialValue={1}>
            <Slider
              min={1}
              max={32}
              tipFormatter={value => {
                return value + '???'
              }}
              marks={{
                1: '1???',
                4: '4???',
                7: '7???',
                14: '14???',
                21: '21???',
                32: '32???'
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
          initialValues={values}
        >
          <Form.Item
            name="category"
            label="??????"
            initialValue={this.state.category}
          >
            <Radio.Group
              // defaultValue="remind"
              buttonStyle="solid"
              onChange={this.onCategoryChange}
            >
              <Radio.Button value="remind">??????</Radio.Button>
              <Radio.Button value="mission">????????????</Radio.Button>
              <Radio.Button value="task">????????????</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {remainList}
        </Form>
      </Modal>
    )
  }
}
