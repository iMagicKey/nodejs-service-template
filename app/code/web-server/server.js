import fs from 'fs'
import WebServer from 'imagic-web-server'
import { resolve } from 'path'
import getConfig from '../../libs/get-config'

const ROOT_PATH = resolve()
const config = getConfig()

const server = new WebServer({
    ...config.web,
    key: fs.readFileSync(`${ROOT_PATH}/app/config/${process.env.APP_ENV}/certs/key.pem`),
    cert: fs.readFileSync(`${ROOT_PATH}/app/config/${process.env.APP_ENV}/certs/cert.pem`),
})

export default server
