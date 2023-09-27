import fs from 'fs'
import util from 'util'

export default class {
    static config = {
        output: ['console'],
        prefix: 'DEFAULT',
    }

    static setConfig(config) {
        this.config = {
            ...this.config,
            ...config,
        }
    }

    static getCurrentDateTime() {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(
            now.getHours()
        ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(
            now.getMilliseconds()
        ).padStart(3, '0')}`
    }

    static writeToConsole(logEntry, data) {
        if (this.config.output.includes('console')) {
            console.log(logEntry, ...data)
        }
    }

    static writeToFile(logEntry, level) {
        if (this.config.output.includes('file')) {
            const LOG_FILE_PATH = `./app/logs/${level}.log`
            fs.appendFileSync(LOG_FILE_PATH, logEntry)
        }
    }

    static write(level, prefix, data) {
        const logTime = this.getCurrentDateTime()
        const logHead = `[${logTime}] (${prefix})`
        const logData = data
            .map((variable) => {
                if (typeof variable === 'string') {
                    return variable
                }

                return util.inspect(variable)
            })
            .join(' ')

        this.writeToConsole(logHead, data)
        this.writeToFile(`${logHead} ${logData}\n`, level)
    }

    static log(...args) {
        this.write('log', this.config.prefix, args)
    }

    static debug(...args) {
        this.write('debug', this.config.prefix, args)
    }

    static error(...args) {
        this.write('error', this.config.prefix, args)
    }

    static warn(...args) {
        this.write('warn', this.config.prefix, args)
    }

    static info(...args) {
        this.write('info', this.config.prefix, args)
    }

    static crit(...args) {
        this.write('crit', this.config.prefix, args)
    }

    static plog(prefix, ...args) {
        this.write('log', prefix, args)
    }

    static pdebug(prefix, ...args) {
        this.write('debug', prefix, args)
    }

    static perror(prefix, ...args) {
        this.write('error', prefix, args)
    }

    static pwarn(prefix, ...args) {
        this.write('warn', prefix, args)
    }

    static pinfo(prefix, ...args) {
        this.write('info', prefix, args)
    }

    static pcrit(prefix, ...args) {
        this.write('crit', prefix, args)
    }
}
