import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import store from '@/store'
import RootLayout from '@/layouts/Root'
import WebSocketClient from '@/components/WebSocketClient'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
            console.log(`Route is changing to: ${url}`)
        }

        router.events.on('routeChangeStart', handleRouteChange)

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])

    return (
        <RootLayout>
            <Provider store={store}>
                <Component {...pageProps} />
                <WebSocketClient />
            </Provider>
        </RootLayout>
    )
}

export default MyApp
