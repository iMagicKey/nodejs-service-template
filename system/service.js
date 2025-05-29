import { writeFileSync, existsSync, rmSync } from 'fs'
import { exit } from 'process'
import { execSync } from 'child_process'
import path from 'path'

const ROOT_PATH = path.resolve()
const [SERVICE_NAME] = ROOT_PATH.split('/').slice(-1)
const SERVICE_FILE_PATH = `${ROOT_PATH}/installed.service`

const action = process.argv[2]
const environment = process.argv[3] === 'dev' ? 'dev' : 'live'
const SERVICE_LOG_LEVELS = ['service-output', 'service-error']

const NODE_PATH = process.execPath
const NODE_DIR = path.dirname(NODE_PATH)

if (action === 'install') {
    if (existsSync(SERVICE_FILE_PATH)) {
        console.log('Service already installed.')
        exit(0)
    }

    SERVICE_LOG_LEVELS.forEach((logLevel) => {
        const filePath = `${ROOT_PATH}/app/logs/${logLevel}.log`
        if (!existsSync(filePath)) writeFileSync(filePath, '')
    })

    writeFileSync(
        SERVICE_FILE_PATH,
        `[Unit]
        Description=${SERVICE_NAME}
        After=multi-user.target

        [Service]
        WorkingDirectory=${ROOT_PATH}
        ExecStart=${path.join(NODE_DIR, 'npm')} run ${environment}
        Restart=always
        RestartSec=10
        StandardOutput=append:${ROOT_PATH}/app/logs/service-output.log
        StandardError=append:${ROOT_PATH}/app/logs/service-error.log
        SyslogIdentifier=${SERVICE_NAME}

        [Install]
        WantedBy=multi-user.target`.replaceAll('    ', '')
    )
    console.log('Service file created')
    execSync(`ln ${SERVICE_FILE_PATH} /etc/systemd/system/${SERVICE_NAME}.service`)
    execSync(`systemctl enable ${SERVICE_NAME}`, { stdio: 'ignore' })
    execSync(`systemctl restart ${SERVICE_NAME}`, { stdio: 'ignore' })

    console.log('Service installed.')
}

if (action === 'uninstall') {
    if (!existsSync(SERVICE_FILE_PATH)) {
        console.log('Service not installed.')
        exit(0)
    }

    execSync(`systemctl stop ${SERVICE_NAME}`, { stdio: 'ignore' })
    execSync(`systemctl disable ${SERVICE_NAME}`, { stdio: 'ignore' })

    const REMOVE_FILE_PATHS = [`/etc/systemd/system/${SERVICE_NAME}.service`, SERVICE_FILE_PATH]
    REMOVE_FILE_PATHS.forEach((filePath) => {
        if (existsSync(filePath)) rmSync(filePath)
    })

    SERVICE_LOG_LEVELS.forEach((logLevel) => {
        const filePath = `${ROOT_PATH}/app/logs/${logLevel}.log`
        if (existsSync(filePath)) rmSync(filePath)
    })

    console.log('Service uninstalled.')
}
