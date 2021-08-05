import { Button, Layout, List, PageHeader, Space } from 'antd'
import { PpaSider } from '../components/ppaSider'
import { PpaListItem } from '../components/ppaListItem'
import { PpaTransaction, syncData } from '../lib/ppaTransaction'
import moment from 'moment'
import useSWR from 'swr'
import { fetcher } from './_app'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/client'
import { PpaButtonModal } from '../components/ppaButtonModal'
const { Header, Footer, Sider, Content } = Layout

const fetchTask = (url: RequestInfo, name?: string) =>
  fetch(url, {
    body: JSON.stringify({ name: name }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())

export default function Task() {
  let { data, error } = useSWR<PpaTransaction[]>('/api/getTasks', fetcher)
  data = data?.map(item => syncData(item))

  return (
    <Layout>
      <PpaSider defaultSelectedKey={'tasks'} />
      <Layout>
        <Header style={{ backgroundColor: '#fff' }}>
          {/*<PageHeader className={'site-page-header'} backIcon={false} title={'任务'} />*/}
        </Header>
        <Content>
          <div style={{ backgroundColor: '#fff' }}>
            <Space>
              <PpaButtonModal buttonText={'新建任务'} buttonStyle={{marginLeft:24}}/>
              {/*<Button type={'primary'} style={{marginLeft:24}}>新建任务</Button>*/}
            </Space>
          </div>
          <div style={{ padding: 24, minHeight: 360, backgroundColor: '#fff' }}>
            <List
              size={'default'}
              bordered={true}
              split={true}
              dataSource={data}
              renderItem={item => <PpaListItem transaction={item} />}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async context => {
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }
  return {
    props: {
      session: session
    }
  }
}
