import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider componentSize={'middle'}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
export default MyApp
