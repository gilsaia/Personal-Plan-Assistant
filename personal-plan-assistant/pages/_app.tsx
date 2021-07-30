import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import { Provider } from 'next-auth/client'

export const fetcher=(url:RequestInfo)=>fetch(url).then((res)=>res.json())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
