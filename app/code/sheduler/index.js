import * as Sheduler from './sheduler'
import { SHEDULER_INTERVAL } from '../config'
import testTask from './tasks/test'

export default async function startSheduler() {
    Sheduler.shedule('testTask', testTask, 15 * 1000, 20 * 1000)
    Sheduler.start(SHEDULER_INTERVAL)
    global.logger.plog('Sheduler', `Started witch interval ${SHEDULER_INTERVAL}ms`)
}
