import { Layout, List, PageHeader } from 'antd'
import { PpaSider } from '../components/ppaSider'
import { PpaListItem } from '../components/ppaListItem'
const { Header, Footer, Sider, Content } = Layout

type transactionType = 'remind' | 'mission' | 'task'

export interface PpaTransaction {
  category: transactionType
  title:string
}

export default function Task() {
  const mockData: PpaTransaction[] = [
    { category: 'remind',title:'Remind' },
    { category: 'mission',title:'任务量 中文测试' },
    { category: 'task',title:'task' }
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
