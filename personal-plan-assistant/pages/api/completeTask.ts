import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { completeTaskTag, uploadTask, uploadTaskTag } from '../../lib/manageData'
import { PpaTransaction } from '../../lib/ppaTransaction'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const session=await getSession({req})
  if(!session||!session.user||!session.user.name){
    res.status(401)
    res.end()
    return
  }
  const prefix=session.user.name+'/'
  const task:PpaTransaction=req.body.task
  await uploadTask(prefix, task)
  if(task.complete){
    await completeTaskTag(prefix,task)
  }
  res.status(200)
  res.end()
}
