import { Layout, List, PageHeader } from 'antd'
import { PpaSider } from '../components/ppaSider'
import { PpaListItem } from '../components/ppaListItem'
import { PpaTransaction, syncData } from '../lib/ppaTransaction'
import moment from 'moment'
import useSWR from 'swr'
import { fetcher } from './_app'
const { Header, Footer, Sider, Content } = Layout

export default function Task() {

  let{data,error}=useSWR<PpaTransaction[]>('/api/getTasks',fetcher)
  data=data?.map(item=>syncData(item))

  return (
    <Layout>
      <PpaSider defaultSelectedKey={'tasks'} />
      <Layout>
        <Header style={{ backgroundColor: '#fff' }}>
          {/*<PageHeader className={'site-page-header'} backIcon={false} title={'任务'} />*/}
        </Header>
        <Content>
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
