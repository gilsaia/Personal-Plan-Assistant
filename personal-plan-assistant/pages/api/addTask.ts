import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { uploadTask } from '../../lib/manageData'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const session=await getSession({req})
  if(!session||!session.user||!session.user.name){
    res.status(401)
    res.end()
    return
  }
  const prefix=session.user.name+'/'
  await uploadTask(prefix, req.body.task)
  res.status(200).end()
}
