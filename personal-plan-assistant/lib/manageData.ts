import mock from './mockData.json'
import { PpaTransaction, syncData } from './ppaTransaction'

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

export async function uploadData(fileName: string, data: PpaTransaction[]) {
  const buffer = Buffer.from(JSON.stringify(data))
  await client.put(fileName, buffer)
}

export async function uploadMockData(fileName: string) {
  const data = Buffer.from(JSON.stringify(mock))
  await client.put(fileName, data)
}
