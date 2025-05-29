import next from 'next'
import path from 'path'

import server from './server'
import { WEB_PORT } from '../config'

import './middleware'
import './routes'

export default async () => {
    const app = next({
        customServer: true,
        experimentalHttpsServer: true,
        dev: process.env.APP_ENV !== 'live',
        port: WEB_PORT,
        dir: path.resolve('src'),
    })
    await app.prepare()

    server.nextRequestHandler = app.getRequestHandler()

    server.listen({ port: WEB_PORT }, () => {
        global.logger.log(`Server started on port ${WEB_PORT}`)
    })
}
