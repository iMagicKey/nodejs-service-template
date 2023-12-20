import next from 'next'
import getConfig from '../../libs/get-config'

import server from './server'
import './middleware'
import './routes'

export default async () => {
    const config = getConfig()
    const app = next({
        customServer: true,
        experimentalHttpsServer: true,
        dev: process.env.APP_ENV !== 'live',
        port: config.web.port,
    })
    await app.prepare()

    server.nextRequestHandler = app.getRequestHandler()

    server.listen({ port: global.config.web.port }, () => {
        global.logger.log(`Server started on port ${global.config.web.port}`)
    })
}
