import run from './code'
import Logger from './libs/logger'
import getConfig from './libs/get-config'

global.config = getConfig()

Logger.setConfig(global.config.logger)
global.logger = Logger

const errorEvents = ['uncaughtException', 'unhandledRejection']
errorEvents.forEach((eventName) => {
    process.on(eventName, (err) => {
        global.logger.crit(eventName, err)
    })
})

run()
