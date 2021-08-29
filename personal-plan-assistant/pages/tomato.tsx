import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'
import { Layout, Progress, Space } from 'antd'
import { PpaSider } from '../components/ppaSider'
import { PpaButtonModal } from '../components/ppaButtonModal'
import { PpaTomatoClock } from '../components/ppaTomatoClock'
const { Header, Footer, Sider, Content } = Layout

export default function Tomato(){
  return (
  <Layout>
    <PpaSider defaultSelectedKey={'tomato'} />
    <Layout>
      <Header style={{ backgroundColor: '#fff' }}>
        {/*<PageHeader className={'site-page-header'} backIcon={false} title={'任务'} />*/}
      </Header>
      <Content>
        <div style={{ padding: 24, minHeight: 360, backgroundColor: '#fff' }}>
        <PpaTomatoClock/>
        </div>
      </Content>
    </Layout>
  </Layout>)
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
