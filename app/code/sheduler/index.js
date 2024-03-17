import * as Sheduler from './sheduler'
import getConfig from '../../libs/get-config'

import testTask from './tasks/test'

export default async function () {
    const config = getConfig()

    Sheduler.shedule('testTask', testTask, 15 * 1000, 20 * 1000)
    Sheduler.start(config.sheduler.interval)
    logger.plog('Sheduler', `Started witch interval ${config.sheduler.interval}ms`)
}
