import React from 'react'
import { Button, Progress, Space, Statistic } from 'antd'
import moment, { Duration, Moment } from 'moment'
const { Countdown } = Statistic

interface tomatoClockState {
  countdownValue: number
  countString: string
  countValue: Duration
  beginCount: boolean
  countPercent:number
}

export class PpaTomatoClock extends React.Component<any, tomatoClockState> {
  constructor(props: any) {
    super(props)
    this.state = {
      countdownValue: moment().valueOf(),
      countString: '25分钟',
      countValue: moment.duration(25, 'm'),
      beginCount: false,
      countPercent:100
    }
    this.progressText = this.progressText.bind(this)
    this.handleStartCount = this.handleStartCount.bind(this)
    this.handleEndCount = this.handleEndCount.bind(this)
    this.onCountChange=this.onCountChange.bind(this)
    this.onCountFinish = this.onCountFinish.bind(this)
  }

  onCountChange(value?:number|string):void {
    this.setState({
      countPercent:((value as number)/this.state.countValue.asMilliseconds())*100
    })
  }

  onCountFinish() {
    this.setState({ beginCount: false })
  }

  progressText(percent?: number): React.ReactNode {
    return (
      <Countdown
        title={this.state.countString}
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
          <Button>修改时间</Button>
          {countButton}
        </Space>
      </Space>
    )
  }
}
