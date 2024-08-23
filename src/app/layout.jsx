import React from 'react'

import { StoreProvider } from '@/components/StoreProvider'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '@/styles/tailwind.css'

export default function RootLayout({ children }) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className="flex flex-col min-h-[100dvh] min-w-screen">
                    <Header />
                    <div className="flex-1">
                        <main>{children}</main>
                    </div>
                    <Footer />
                </body>
            </html>
        </StoreProvider>
    )
}
