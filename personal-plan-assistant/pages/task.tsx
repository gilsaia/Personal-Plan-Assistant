import { Layout } from 'antd'
import { PpaSider } from '../components/ppaSider'
const { Header, Footer, Sider, Content } = Layout

export default function Task() {
  return (
    <Layout>
      <PpaSider defaultSelectedKey={'tasks'} />
      <Layout>
        <Header style={{backgroundColor:'#fff'}}/> <Content>??</Content>
      </Layout>
    </Layout>
  )
}
