import { Button, Layout } from 'antd'
import { Ppa_menu } from '../components/ppa_menu'
const { Header, Footer, Sider, Content } = Layout

export default function Test() {
  return (
    <Layout>
      <Sider style={{ height:'100vh' }}>
        <Ppa_menu />
      </Sider>
      <Content>??</Content>
    </Layout>
  )
}
