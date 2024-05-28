import startSheduler from './sheduler'
import startWebServer from './web-server'
import './ws-server'

export default async () => {
    startWebServer()
    startSheduler()
}
