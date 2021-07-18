import { Layout, List, PageHeader } from 'antd'
import { PpaSider } from '../components/ppaSider'
import { PpaListItem } from '../components/ppaListItem'
const { Header, Footer, Sider, Content } = Layout

export default function Task() {
  const mockData = ['1', '22,', '33,']
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
              renderItem={item => (
                <List.Item>
                  <PpaListItem />
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
