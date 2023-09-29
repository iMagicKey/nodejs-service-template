import fs from 'fs'
import run from './code'
import { isJSON } from './libs/utils'
import Logger from './libs/logger'

global.config = {}
const CONFIG_DIR = `./app/config/${process.env.NODE_ENV}`
const ENTRIES = fs.readdirSync(CONFIG_DIR)
const CONFIG_FILES = ENTRIES.filter((val) => val.slice(-5) === '.json')

CONFIG_FILES.forEach((configFile) => {
    const configName = configFile.slice(0, -5).toLowerCase()
    const configData = fs.readFileSync(`${CONFIG_DIR}/${configFile}`)

    if (isJSON(configData) === true) {
        global.config[configName] = JSON.parse(configData)
    } else {
        throw Error(`Can't parse JSON config: ${CONFIG_DIR}/${configFile}`)
    }
})

Logger.setConfig(global.config.logger)
global.logger = Logger

const errorEvents = ['uncaughtException', 'unhandledRejection']
errorEvents.forEach((eventName) => {
    process.on(eventName, (err) => {
        global.logger.crit(eventName, err)
    })
})

run()
