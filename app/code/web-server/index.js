import server from './server'
import './middleware'
import './routes'

export default async () => {
    server.listen({ port: global.config.web.port }, () => {
        global.logger.log(`Server started on port ${global.config.web.port}`)
    })
}
