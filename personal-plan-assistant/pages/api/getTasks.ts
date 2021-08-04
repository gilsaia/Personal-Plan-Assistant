import { NextApiRequest, NextApiResponse } from 'next'
import { PpaTransaction, syncData } from '../../lib/ppaTransaction'
import moment from 'moment'
import mock from '../../lib/mockData.json'
import { getData, getUserTasks, uploadMockData } from '../../lib/manageData'
import { getSession } from 'next-auth/client'
import { apiAuth } from '../../lib/auth'
import {v1,NIL} from 'uuid'

const mockData: PpaTransaction[] = [
  {
    key:v1(),
    category: 'remind',
    title: 'Remind',
    beginTime: moment(),
    endTime: moment('2021-07-26 00:00', 'YYYY-MM-DD HH:mm'),
    complete:false
  },
  {
    key:v1(),
    category: 'mission',
    title: '任务量 中文测试',
    beginTime: moment(),
    volume: {
      total: moment.duration('50', 'h'),
      period: moment.duration('7', 'd'),
      complete: moment.duration('25', 'h')
    },
    complete:true
  },
  {
    key:v1(),
    category: 'task',
    title: 'task',
    beginTime: moment(),
    stats: {
      total: 20,
      period: moment.duration('7', 'd'),
      complete: 5
    },
    complete:true
  }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PpaTransaction[]>
) {
  const session=await getSession({req})
  if(!session||!session.user||!session.user.name){
    res.status(401)
    res.end()
    return
  }
  const name=session.user.name
  const tasks=await getUserTasks(name)
  res.status(200).json(tasks)
}
