import moment, { Moment } from 'moment'
import { Progress, Typography } from 'antd'
import React from 'react'

type transactionType = 'remind' | 'mission' | 'task'

interface PpaMissionVolume {
  total?: moment.Duration
  period: moment.Duration
  complete: moment.Duration
}

interface PpaTaskStats {
  total?: number
  period: moment.Duration
  complete: number
}

export interface PpaTransaction {
  key: string
  category: transactionType
  title: string
  beginTime: Moment
  complete: boolean
  endTime?: Moment
  volume?: PpaMissionVolume
  stats?: PpaTaskStats
}

const colorMap = {
  remind: 'red',
  mission: 'orange',
  task: 'cyan'
}

export function syncData(item: PpaTransaction): PpaTransaction {
  item.beginTime = moment(item.beginTime)
  if (item.endTime) {
    item.endTime = moment(item.endTime)
  }
  if (item.volume) {
    item.volume.complete = moment.duration(item.volume.complete)
    item.volume.period = moment.duration(item.volume.period)
    if (item.volume.total) {
      item.volume.total = moment.duration(item.volume.total)
    }
  }
  if (item.stats) {
    item.stats.period = moment.duration(item.stats.period)
  }
  return item
}

export function getPpaTransactionColor(item: PpaTransaction): string {
  return colorMap[item.category]
}

export function getPpaTransactionTitle(item: PpaTransaction): JSX.Element {
  if (!item.complete) {
    return <Typography.Text>{item.title}</Typography.Text>
  } else {
    return <Typography.Text delete>{item.title}</Typography.Text>
  }
}

function translateDuration(duration: moment.Duration): string {
  let res = ''
  if (duration.asDays()) {
    res += Math.floor(duration.asDays()) + '天'
  }
  if (duration.asHours()) {
    res += (duration.asHours() % 24) + '小时'
  }
  if (duration.asMinutes() || res === '') {
    res += (duration.asMinutes() % 60) + '分'
  }
  return res
}

export function getPpaTransactionShow(item: PpaTransaction): JSX.Element {
  let text = ''
  if (item.complete) {
    return <Typography.Text type={'secondary'}>{text}</Typography.Text>
  }
  switch (item.category) {
    case 'mission':
      if (item.volume) {
        text = '完成量' + translateDuration(item.volume.complete)
        let progress = -1
        if (item.volume.total) {
          const progress =
            (item.volume.complete.asMinutes() / item.volume.total.asMinutes()) *
            100
          return (
            <div style={{ width: 170 }}>
              <Progress
                percent={progress}
                type={'line'}
                size={'small'}
                format={() => (
                  <Typography.Text type={'secondary'}>{text}</Typography.Text>
                )}
              />
            </div>
          )
        }
      }
      return <Typography.Text type={'secondary'}>{text}</Typography.Text>
    case 'remind':
      if (item.endTime) {
        if (moment().isBefore(item.endTime)) {
          text = item.endTime.fromNow() + '过期'
        } else {
          text = '已于' + item.endTime.fromNow() + '截止'
        }
      }
      return <Typography.Text type={'secondary'}>{text}</Typography.Text>
    case 'task':
      if (item.stats) {
        text = '完成' + item.stats.complete + '次'
        if (item.stats.total) {
          const progress = (item.stats.complete / item.stats.total) * 100
          return (
            <div style={{ width: 170 }}>
              <Progress
                strokeColor={'orange'}
                percent={progress}
                type={'line'}
                size={'small'}
                format={() => (
                  <Typography.Text type={'secondary'}>{text}</Typography.Text>
                )}
              />
            </div>
          )
        }
      }
      return <Typography.Text type={'secondary'}>{text}</Typography.Text>
  }
  return <Typography.Text type={'secondary'}>{text}</Typography.Text>
}
