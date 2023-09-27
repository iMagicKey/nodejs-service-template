// eslint-disable-next-line func-names
export default async function () {
    global.logger.log('log', 0, 0.23)
    global.logger.error('error', 1)
    global.logger.warn('warn', 2)
    global.logger.debug('debug', 3)
    global.logger.info('info', 4)
    global.logger.crit('crit', 5)

    global.logger.plog('LOG_PREFIX', 'log', 0)
    global.logger.perror('ERROR_PREFIX', 'error', 1)
    global.logger.pwarn('WARN_PREFIX', 'warn', 2)
    global.logger.pdebug('DEBUF_PREFIX', 'debug', 3)
    global.logger.pinfo('INFO_PREFIX', 'info', 4)
    global.logger.pcrit('CRIT_PREFIX', 'info', 4)
}
