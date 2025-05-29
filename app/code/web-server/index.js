import server from './server'
import { WEB_PORT } from '../config'

import './middleware'
import './routes'

export default async () => {
    server.listen({ port: WEB_PORT }, () => {
        global.logger.log(`Server started on port ${WEB_PORT}`)
    })
}
