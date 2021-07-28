import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'

export const fetcher=(url:RequestInfo)=>fetch(url).then((res)=>res.json())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider componentSize={'middle'}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
export default MyApp
