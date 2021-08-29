import React from 'react'
import { Button, Progress, Space, Statistic } from 'antd'
const { Countdown } = Statistic

function progressText(precent?: number): React.ReactNode {
  return <Countdown value={Date.now()} />
}

export class PpaTomatoClock extends React.Component<any, any> {
  render() {
    return (
      <Space direction={'vertical'} align={'center'}>
        <Progress type={'dashboard'} percent={87} width={240} format={progressText} />
        <Space>
          <Button>修改时间</Button>
          <Button type={'primary'}>开始计时</Button>
        </Space>
      </Space>
    )
  }
}
