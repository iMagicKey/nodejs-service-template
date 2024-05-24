import Logger from '../../libs/logger'

const tasks = {}
let shedulerInterval = null

export function start(interval) {
    shedulerInterval = setInterval(() => {
        const now = Date.now()

        Object.keys(tasks).forEach((taskName) => {
            if (now >= tasks[taskName].nextExecuteTime && tasks[taskName].inProcess === false) {
                tasks[taskName].nextExecuteTime = Date.now() + tasks[taskName].interval

                const executionTimeout = setTimeout(() => {
                    Logger.pdebug('Sheduler', `Timeout execution ${taskName}:`, tasks[taskName].timeout)
                }, tasks[taskName].timeout)

                tasks[taskName]
                    .fn()
                    .then(() => {
                        clearTimeout(executionTimeout)
                        tasks[taskName].inProcess = false
                    })
                    .catch((err) => {
                        clearTimeout(executionTimeout)
                        tasks[taskName].inProcess = false

                        Logger.perror('Sheduler', `Runtime error ${taskName}:`, err)
                    })
            }
        })
    }, interval)
}

export function stop() {
    clearInterval(shedulerInterval)
}

export function shedule(taskName, fn, interval, timeout = 10 * 1000) {
    if (taskName in tasks) {
        return Logger.perror('Sheduler', `Task ${taskName} already sheduled`)
    }

    tasks[taskName] = {
        inProcess: false,
        fn,
        interval,
        timeout,
        nextExecuteTime: Date.now(),
    }

    return Logger.plog('Sheduler', `Task ${taskName} sheduled successful`)
}
