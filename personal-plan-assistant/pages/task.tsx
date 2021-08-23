import { Button, Collapse, Layout, List, PageHeader, Space } from 'antd'
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
import { PpaTaskModal } from '../components/ppaTaskModal'
import { Panel } from 'rc-collapse'
import { divideTransaction } from '../lib/sort'
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
  const transactionData = data?.map(item => syncData(item))
  let divideData = divideTransaction(transactionData)
  let collapse = (
    <Collapse ghost defaultActiveKey={divideData[0].key}>
      {divideData.map(rule => {
        return (
          <Panel header={rule.title} key={rule.key}>
            <List
              size={'default'}
              bordered={true}
              split={true}
              dataSource={rule.itemList}
              renderItem={item => (
                <PpaListItem key={item.key} transaction={item} />
              )}
            />
          </Panel>
        )
      })}
    </Collapse>
  )

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
              <PpaButtonModal
                buttonText={'新建任务'}
                buttonStyle={{ marginLeft: 24 }}
              />
              {/*<Button type={'primary'} style={{marginLeft:24}}>新建任务</Button>*/}
            </Space>
          </div>
          <div style={{ padding: 24, minHeight: 360, backgroundColor: '#fff' }}>
            {collapse}
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
