import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const ROOT_PATH = resolve()

const FOLDER_NAMES = ['data', 'logs', 'resources', 'storage', 'config/dev']
FOLDER_NAMES.forEach((folderName) => {
    const folderPath = `${ROOT_PATH}/app/${folderName}/`
    if (!existsSync(folderPath)) mkdirSync(folderPath)
})

const LOG_LEVELS = ['log', 'debug', 'error', 'warn', 'info', 'crit', 'service-output', 'service-error']
LOG_LEVELS.forEach((logLevel) => {
    const filePath = `${ROOT_PATH}/app/logs/${logLevel}.log`
    if (!existsSync(filePath)) writeFileSync(filePath, '')
})

const ENV_FILES = ['.env', '.env.dev']
ENV_FILES.forEach((fileName, index) => {
    const filePath = `${ROOT_PATH}/${fileName}`
    if (!existsSync(filePath)) {
        if (index === 0) {
            writeFileSync(filePath, 'APP_ENV=live\nNODE_ENV=production\n\nSHEDULER_INTERVAL=15000\nWEB_PORT=3100\nWEB_HTTPS=false')
        }
        if (index === 1) {
            writeFileSync(filePath, 'APP_ENV=dev\nNODE_ENV=development\n\nSHEDULER_INTERVAL=15000\nWEB_PORT=3100\nWEB_HTTPS=false')
        }
    }
})
