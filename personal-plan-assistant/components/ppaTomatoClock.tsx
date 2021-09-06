import React from 'react'
import {
  Button,
  InputNumber,
  Popover,
  Progress,
  Space,
  Statistic,
  Typography
} from 'antd'
import moment, { Duration, Moment } from 'moment'
import { PpaIconButton } from './ppaIconButton'
import { CheckCircleOutlined } from '@ant-design/icons'
const { Countdown } = Statistic

interface tomatoClockState {
  countdownValue: number
  countValue: Duration
  beginCount: boolean
  countPercent: number
  popVisible: boolean
  popValue: number
}

export class PpaTomatoClock extends React.Component<any, tomatoClockState> {
  constructor(props: any) {
    super(props)
    this.state = {
      countdownValue: moment().valueOf(),
      countValue: moment.duration(25, 'm'),
      beginCount: false,
      countPercent: 100,
      popVisible: false,
      popValue: 25
    }
    this.progressText = this.progressText.bind(this)
    this.handleStartCount = this.handleStartCount.bind(this)
    this.handleEndCount = this.handleEndCount.bind(this)
    this.handlePopVisible = this.handlePopVisible.bind(this)
    this.onCountChange = this.onCountChange.bind(this)
    this.onCountFinish = this.onCountFinish.bind(this)
    this.onClockValueChange = this.onClockValueChange.bind(this)
    this.onClockChange = this.onClockChange.bind(this)
  }

  onCountChange(value?: number | string): void {
    this.setState({
      countPercent:
        ((value as number) / this.state.countValue.asMilliseconds()) * 100
    })
  }

  onCountFinish() {
    this.setState({ beginCount: false })
  }

  onClockValueChange(value: number) {
    value = Math.floor(value)
    this.setState({ popValue: value })
  }

  onClockChange() {
    this.setState({
      countValue: moment.duration(this.state.popValue, 'm'),
      popVisible: false
    })
  }

  progressText(percent?: number): React.ReactNode {
    return (
      <Countdown
        title={this.state.countValue.humanize()}
        value={this.state.countdownValue}
        onFinish={this.onCountFinish}
        onChange={this.onCountChange}
      />
    )
  }

  handleStartCount() {
    this.setState({
      countdownValue: moment().add(this.state.countValue).valueOf(),
      beginCount: true
    })
  }

  handleEndCount() {
    this.setState({
      countdownValue: moment().valueOf(),
      beginCount: false
    })
  }

  handlePopVisible(visible: boolean) {
    this.setState({ popVisible: visible })
  }

  render() {
    let countButton: React.ReactNode
    if (this.state.beginCount) {
      countButton = (
        <Button type={'primary'} onClick={this.handleEndCount} danger>
          停止计时
        </Button>
      )
    } else {
      countButton = (
        <Button type={'primary'} onClick={this.handleStartCount}>
          开始计时
        </Button>
      )
    }
    const popContent = (
      <>
        <Space>
          <InputNumber
            min={1}
            max={240}
            defaultValue={25}
            onChange={this.onClockValueChange}
          />
          <Typography.Text>分钟</Typography.Text>
          <Button type={'primary'} onClick={this.onClockChange}>
            提交
          </Button>
        </Space>
      </>
    )
    return (
      <Space direction={'vertical'} align={'center'}>
        <Progress
          type={'dashboard'}
          percent={this.state.countPercent}
          width={240}
          format={this.progressText}
          strokeColor={'orange'}
        />
        <Space>
          <Popover
            content={popContent}
            title={'番茄钟时间'}
            trigger={'click'}
            visible={this.state.popVisible}
            onVisibleChange={this.handlePopVisible}
          >
            <Button>修改时间</Button>
          </Popover>
          {countButton}
        </Space>
      </Space>
    )
  }
}
