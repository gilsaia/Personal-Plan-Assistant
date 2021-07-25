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
  total?:number
  period:moment.Duration
  complete:number
}

export interface PpaTransaction {
  category: transactionType
  title: string
  beginTime: Moment
  endTime?: Moment
  volume?: PpaMissionVolume
  stats?:PpaTaskStats
}

const colorMap = {
  remind: 'red',
  mission: 'orange',
  task: 'cyan'
}

export function getPpaTransactionColor(item: PpaTransaction): string {
  return colorMap[item.category]
}

function translateDuration(duration:moment.Duration):string{
  let res=''
  if(duration.asDays()){
    res+=Math.floor(duration.asDays())+'天'
  }
  if(duration.asHours()){
    res+=duration.asHours()%24+'小时'
  }
  if(duration.asMinutes()||(res==='')){
    res+=duration.asMinutes()%60+'分'
  }
  return res
}

export function getPpaTransactionShow(item: PpaTransaction): JSX.Element {
  let text = ''
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
            <div style={{width:170}}>
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
      if(item.stats){
        text = '完成' + item.stats.complete+'次'
        if(item.stats.total){
          const progress =
            (item.stats.complete/ item.stats.total) *
            100
          return (
            <div style={{width:170}}>
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
  return <Typography.Text type={'secondary'}>截止</Typography.Text>
}
