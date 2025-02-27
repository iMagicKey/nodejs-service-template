import next from 'next'
import path from 'path'
import getConfig from '../../libs/get-config'

import server from './server'
import './middleware'
import './routes'

export default async () => {
    const port = Number(process.env.WEB_PORT)

    const app = next({
        customServer: true,
        experimentalHttpsServer: true,
        dev: process.env.APP_ENV !== 'live',
        port,
        dir: path.resolve('src'),
    })
    await app.prepare()

    server.nextRequestHandler = app.getRequestHandler()

    server.listen({ port }, () => {
        global.logger.log(`Server started on port ${port}`)
    })
}
