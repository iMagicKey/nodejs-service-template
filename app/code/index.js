import startSheduler from './sheduler'
import startWebServer from './web-server'

// eslint-disable-next-line func-names
export default async () => {
    startWebServer()
    startSheduler()
}
