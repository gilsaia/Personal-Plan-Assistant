import moment, { Moment } from 'moment'
import { Progress, Typography } from 'antd'
import React from 'react'
import { v1 } from 'uuid'

type transactionType = 'remind' | 'mission' | 'task'

interface PpaMissionVolume {
  total?: moment.Duration
  period?: moment.Duration
  complete: moment.Duration
}

interface PpaTaskStats {
  total?: number
  period?: moment.Duration
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
    if(item.volume.period){
      item.volume.period=moment.duration(item.volume.period)
    }
    if (item.volume.total) {
      item.volume.total = moment.duration(item.volume.total)
    }
  }
  if (item.stats) {
    if(item.stats.period){
      item.stats.period=moment.duration(item.stats.period)
    }
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

export function getPpaTransactionCmpTime(item:PpaTransaction):Moment{
  if(item.category==='remind'&&item.endTime){
    return item.endTime
  }
  if(item.category==='mission'&&item.volume&&item.volume.period){
    return item.beginTime.add(item.volume.period)
  }
  if(item.category==='task'&&item.stats&&item.stats.period){
    return item.beginTime.add(item.stats.period)
  }
  return item.beginTime
}

export function constructRemind(title:string,enableTime:boolean,endTime?:Moment):PpaTransaction{
  return {
    key:v1(),
    category:'remind',
    title:title,
    beginTime:moment(),
    endTime:enableTime?endTime:undefined,
    complete:false
  }
}

export function constructMission(title:string,beginTime:Moment,unlimited?:boolean,volume?:number,repeat?:boolean,period?:number):PpaTransaction{
  return {
    key:v1(),
    category:'mission',
    title:title,
    beginTime:beginTime,
    complete:false,
    volume:{
      total:unlimited?undefined:moment.duration(volume,'hours'),
      period:repeat?moment.duration(period,'days'):undefined,
      complete:moment.duration(0)
    }
  }
}

export function constructTask(title:string,beginTime:Moment,unlimited?:boolean,volume?:number,repeat?:boolean,period?:number):PpaTransaction{
  return {
    key:v1(),
    category:'task',
    title:title,
    beginTime:beginTime,
    complete:false,
    stats:{
      total:unlimited?undefined:volume,
      period:repeat?moment.duration(period,'days'):undefined,
      complete:0
    }
  }
}

export function completeMission(item:PpaTransaction,value:number):PpaTransaction{
  if(item.volume){
    item.volume.complete.add(value,'m')
    if(item.volume.total&&(item.volume.complete.asMinutes()>=item.volume.total.asMinutes())){
      item.complete=true
    }else if(item.volume.period&&moment().isBefore(item.beginTime.add(item.volume.period))){
      item.complete=true
    }
  }
  return item
}

export function completeTask(item:PpaTransaction,value:number):PpaTransaction{
  if(item.stats){
    item.stats.complete+=value
    if(item.stats.total&&(item.stats.complete>=item.stats.total)){
      item.complete=true
    }else if(item.stats.period && moment().isBefore(item.beginTime.add(item.stats.period))){
      item.complete=true
    }
  }
  return item
}

export function renewMission(item:PpaTransaction):PpaTransaction|null{
  let obj={}
  let mission=Object.assign(obj,item)
  if(mission.complete&&mission.volume&&mission.volume.period){
    mission.key=v1()
    mission.complete=false
    mission.volume.complete=moment.duration(0)
    mission.beginTime=moment.max(mission.beginTime.add(mission.volume.period),moment(0,'HH'))
    return mission
  }
  return null
}

export function renewTask(item:PpaTransaction):PpaTransaction|null{
  let obj={}
  let task=Object.assign(obj,item)
  if(task.complete&&task.stats&&task.stats.period){
    task.key=v1()
    task.complete=false
    task.stats.complete=0
    task.beginTime=moment.max(task.beginTime.add(task.stats.period),moment(0,'HH'))
    return task
  }
  return null
}

export function translateTask(values:any):PpaTransaction{
  let task={}
  if (values.category === 'remind') {
    task = constructRemind(
      values.title,
      values.enableDate,
      values.date
    )
  } else if (values.category === 'mission') {
    task = constructMission(
      values.title,
      values.date,
      values.unlimited,
      values.volume,
      values.repeat,
      values.period
    )
  } else if (values.category === 'task') {
    task = constructTask(
      values.title,
      values.date,
      values.unlimited,
      values.volume,
      values.repeat,
      values.period
    )
  }
  return task as PpaTransaction
}

export function antiTranslateTask(task:PpaTransaction):any{
  let values=Object()
  if(task.category==='remind'){
    values.category='remind'
    values.title=task.title
    values.enableDate=false
    if(task.endTime){
      values.enableDate=true
      values.date=task.endTime
    }
  }else if(task.category==='mission'){
    values.category='mission'
    values.title=task.title
    values.date=task.beginTime
    values.unlimited=true
    if(task.volume?.total){
      values.unlimited=false
      values.volume=task.volume.total.asHours()
    }
    values.repeat=false
    if(task.volume?.period){
      values.repeat=true
      values.period=task.volume.period.asDays()
    }
  }else if(task.category==='task'){
    values.category='task'
    values.title=task.title
    values.date=task.beginTime
    values.unlimited=true
    if(task.stats?.total){
      values.unlimited=false
      values.volume=task.stats.total
    }
    values.repeat=false
    if(task.stats?.period){
      values.repeat=true
      values.period=task.stats.period.asDays()
    }
  }
  return values
}

function translateDuration(duration: moment.Duration): string {
  let res = ''
  if (duration.asDays()) {
    res += Math.floor(duration.asDays()) + '天'
  }
  if (duration.asHours()) {
    res += Math.floor(duration.asHours() % 24) + '小时'
  }
  if (duration.asMinutes() || res === '') {
    res += (duration.asMinutes() % 60) + '分'
  }
  return res
}

function getTimelineText(item:PpaTransaction):string{
  if(moment().isBefore(item.beginTime)){
    return item.beginTime.fromNow(true)+'后开始'
  }
  if(item.category==='remind'&&item.endTime){
    if (moment().isBefore(item.endTime)) {
      return  item.endTime.fromNow() + '过期'
    } else {
      return  '已于' + item.endTime.fromNow() + '截止'
    }
  }
  if(item.category==='mission'&&item.volume&&item.volume.period){
    const endTime=item.beginTime.add(item.volume.period)
    if(moment().isBefore(endTime)){
      return endTime.fromNow()+'过期'
    }else{
      return '已于'+endTime.fromNow()+'截止'
    }
  }
  if(item.category==='task'&&item.stats&&item.stats.period){
    const endTime=item.beginTime.add(item.stats.period)
    if(moment().isBefore(endTime)){
      return endTime.fromNow()+'过期'
    }else{
      return '已于'+endTime.fromNow()+'截止'
    }
  }
  return '开始于'+item.beginTime.fromNow()
}

export function getPpaTransactionShow(item: PpaTransaction): JSX.Element {
  let text = ''
  let timelineText=getTimelineText(item)
  if (item.complete) {
    return <Typography.Text type={'secondary'}>{text}</Typography.Text>
  }
  switch (item.category) {
    case 'mission':
      if (item.volume) {
        text = '完成量' + translateDuration(item.volume.complete)+' '+timelineText
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
      text=timelineText
      return <Typography.Text type={'secondary'}>{text}</Typography.Text>
    case 'task':
      if (item.stats) {
        text = '完成' + item.stats.complete + '次'+' '+timelineText
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
