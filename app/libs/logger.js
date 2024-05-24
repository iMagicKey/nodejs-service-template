import fs from 'fs'
import util from 'util'

export default class Logger {
    static config = {
        output: ['console'],
        prefix: 'DEFAULT',
    }

    static LOG_LEVELS = ['log', 'debug', 'error', 'warn', 'info', 'crit']

    static setConfig = (config) => {
        this.config = {
            ...this.config,
            ...config,
        }
    }

    static getCurrentDateTime = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const date = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0')

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`
    }

    static writeToConsole = (logEntry, data) => {
        if (this.config.output.includes('console')) {
            // eslint-disable-next-line no-console
            console.log(logEntry, ...data)
        }
    }

    static writeToFile = (logEntry, level) => {
        if (this.config.output.includes('file')) {
            const LOG_FILE_PATH = `./app/logs/${level}.log`
            fs.appendFileSync(LOG_FILE_PATH, logEntry)
        }
    }

    static write = (level, prefix, data) => {
        const logTime = this.getCurrentDateTime()
        const logHead = `[${logTime}] (${prefix})`
        const logData = data.map((variable) => (typeof variable === 'string' ? variable : util.inspect(variable))).join(' ')

        this.writeToConsole(logHead, data)
        this.writeToFile(`${logHead} ${logData}\n`, level)
    }

    static generateLogMethods() {
        this.LOG_LEVELS.forEach((level) => {
            this[level] = (...args) => {
                this.write(level, this.config.prefix, args)
            }

            this[`p${level}`] = (prefix, ...args) => {
                this.write(level, prefix, args)
            }
        })
    }
}

Logger.generateLogMethods()
