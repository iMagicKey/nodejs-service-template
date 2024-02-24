import { writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const logs = process.argv.slice(2)
const ROOT_PATH = resolve()
const LOG_LEVELS = ['log', 'debug', 'error', 'warn', 'info', 'crit']

LOG_LEVELS.forEach((logLevel) => {
    const filePath = resolve(ROOT_PATH, 'app', 'logs', `${logLevel}.log`)
    if (existsSync(filePath) && (!logs.length || logs.includes(logLevel))) writeFileSync(filePath, '')
})
