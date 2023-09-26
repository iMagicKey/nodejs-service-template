import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const ROOT_PATH = resolve()

const FOLDER_NAMES = ['data', 'logs', 'resources', 'storage']
FOLDER_NAMES.forEach((folderName) => {
    const folderPath = `${ROOT_PATH}/app/${folderName}/`
    if (!existsSync(folderPath)) mkdirSync(folderPath)
})

const LOG_LEVELS = ['debug', 'info', 'warning', 'error', 'critical', 'service-output', 'service-error']
LOG_LEVELS.forEach((logLevel) => {
    const filePath = `${ROOT_PATH}/app/logs/${logLevel}.log`
    if (!existsSync(filePath)) writeFileSync(filePath, '')
})
