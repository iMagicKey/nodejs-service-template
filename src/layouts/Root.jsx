import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '../styles/tailwind.css'

export default function RootLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen min-w-screen bg-dashboard-mobile lg:bg-dashboard-desktop bg-no-repeat bg-cover">
            <Header/>
            <div className="flex-1">
                <div className="overflow-hidden flex flex-col">
                    <main>{children}</main>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
