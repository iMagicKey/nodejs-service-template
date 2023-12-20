import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className="dark">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#000000" />
                <link rel="shortcut icon" href="/img/brand/favicon.ico" />
                <link rel="apple-touch-icon" sizes="76x76" href="/img/brand/apple-icon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
