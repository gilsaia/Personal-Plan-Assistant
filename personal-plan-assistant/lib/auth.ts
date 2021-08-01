import type { NextApiRequest } from 'next'
import { getSession } from 'next-auth/client'

export async function apiAuth(req:NextApiRequest):Promise<boolean>{
  const session=await getSession({req})
  return !!session;
}
