import { NextApiRequest, NextApiResponse } from 'next'
import { PpaTransaction } from '../../lib/ppaTransaction'
import moment from 'moment'

const mockData: PpaTransaction[] = [
  {
    category: 'remind',
    title: 'Remind',
    beginTime: moment(),
    endTime: moment('2021-07-26 00:00', 'YYYY-MM-DD HH:mm'),
    complete:false
  },
  {
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PpaTransaction[]>
) {
  res.status(200).json(mockData)
}
