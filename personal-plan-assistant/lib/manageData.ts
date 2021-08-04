import mock from './mockData.json'
import { PpaTransaction, syncData } from './ppaTransaction'
import { string } from 'prop-types'

interface ossTag{
  [tagName:string]:string
}

let OSS = require('ali-oss')

const client = new OSS({
  region: process.env.OSS_ACCESS_REGION,
  accessKeyId: process.env.OSS_ACCESS_ID,
  accessKeySecret: process.env.OSS_ACCESS_SECRET,
  bucket: 'personal-plan-assistant',
  secure: true
})

export async function getData(fileName: string): Promise<PpaTransaction[]> {
  let res = []
  try {
    await client.head(fileName, {})
    res = await client.get(fileName)
    res = JSON.parse(res.content.toString())
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      const buffer = Buffer.from(JSON.stringify(mock))
      await client.put(fileName, buffer)
    }
    res = mock
  }
  return res.map((item: PpaTransaction) => syncData(item))
}

export async function getUserTasks(
  userName: string
): Promise<PpaTransaction[]> {
  const userFolder = userName + '/'
  let tasks: PpaTransaction[] = []
  try {
    await client.head(userFolder, {})
    let result=await client.listV2({
      delimiter:'/',
      prefix:userFolder,
    })
    for(const file of result.objects){
      if(file.size>0){
        let task=await client.get(file.name)
        task=JSON.parse(task.content.toString())
        tasks.push(task)
      }
    }
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      client.put(userFolder, Buffer.from(''))
      await uploadMockData(userFolder)
    }
    tasks = mock as unknown as PpaTransaction[]
  }
  return tasks
}

export async function uploadMockData(prefix: string) {
  for (const task of mock) {
    await uploadTask(prefix, task as unknown as PpaTransaction)
  }
}

export async function uploadTask(prefix: string, task: PpaTransaction) {
  const taskPath = prefix + task.key + '.json'
  const buffer = Buffer.from(JSON.stringify(task))
  await client.put(taskPath, buffer)
}

export async function completeTaskTag(prefix:string,task:PpaTransaction){
  let nextKeyMarker=null
  let nextVersionMarker=null
  let versionListing=null
  const taskPath = prefix + task.key + '.json'
  const tag={
    complete:'true'
  }
  do {
    versionListing=await client.getBucketVersions({
      keyMarker:nextKeyMarker,
      versionIdMarker:nextVersionMarker,
      prefix:taskPath
    })
    for(const task of versionListing.objects){
      try {
        await client.putObjectTagging(task.name, tag, {
          versionId: task.versionId
        })
      }catch (e) {
        console.log(e)
      }
    }
    nextKeyMarker=versionListing.NextKeyMarker
    nextVersionMarker=versionListing.NextVersionIdMarker
  }while(versionListing.isTruncated)
}

export async function uploadTaskTag(prefix:string,task:PpaTransaction,tag:ossTag){
  const taskPath = prefix + task.key + '.json'
  try{
    await client.putObjectTagging(taskPath,tag)
  }catch (e) {
    console.log(e)
  }
}

export async function uploadData(fileName: string, data: PpaTransaction[]) {
  const buffer = Buffer.from(JSON.stringify(data))
  await client.put(fileName, buffer)
}
