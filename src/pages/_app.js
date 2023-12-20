import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
import RootLayout from '@/layouts/Root'
import { useRouter } from 'next/router'

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
            </Provider>
        </RootLayout>
    )
}

export default MyApp
