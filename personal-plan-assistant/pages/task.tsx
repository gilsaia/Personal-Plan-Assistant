import { Layout, List, PageHeader } from 'antd'
import { PpaSider } from '../components/ppaSider'
import { PpaListItem } from '../components/ppaListItem'
import { PpaTransaction } from '../lib/ppaTransaction'
import moment from 'moment'
const { Header, Footer, Sider, Content } = Layout

export default function Task() {
  const mockData: PpaTransaction[] = [
    {
      category: 'remind',
      title: 'Remind',
      beginTime: moment(),
      endTime: moment('2021-07-26 00:00', 'YYYY-MM-DD HH:mm')
    },
    {
      category: 'mission',
      title: '任务量 中文测试',
      beginTime: moment(),
      volume: {
        total: moment.duration('50', 'h'),
        period: moment.duration('7', 'd'),
        complete: moment.duration('25', 'h')
      }
    },
    {
      category: 'task',
      title: 'task',
      beginTime: moment(),
      stats: {
        total: 7,
        period: moment.duration('7', 'd'),
        complete: 3
      }
    }
  ]
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
              dataSource={mockData}
              renderItem={item => <PpaListItem transaction={item} />}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
