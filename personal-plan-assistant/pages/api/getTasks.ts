import { NextApiRequest, NextApiResponse } from 'next'
import { PpaTransaction, syncData } from '../../lib/ppaTransaction'
import moment from 'moment'
import mock from '../../lib/mockData.json'
import { getData, uploadMockData } from '../../lib/manageData'
import { getSession } from 'next-auth/client'
import { apiAuth } from '../../lib/auth'

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
  apiAuth(req).then(check=>{
    if(!check){
      res.status(401)
      res.end()
    }
  })
  let fileName='mockData.json'
  if(req.method==='POST'&&req.body.name){
    fileName=(req.body.name as string)+'.json'
  }
  let data:PpaTransaction[]=[]
  getData(fileName).then(userData=>{
    res.status(200).json(userData)
  }).catch(error=>{
    res.status(200).json(mockData)
  })
  // res.status(200).json(mockData)
}
