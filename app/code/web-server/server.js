import fs from 'fs'
import WebServer from 'imagic-web-server'
import { resolve } from 'path'

const ROOT_PATH = resolve()

const server = new WebServer({
    port: Number(process.env.WEB_PORT),
    https: process.env.WEB_HTTPS === 'true',
    key: fs.readFileSync(`${ROOT_PATH}/app/config/${process.env.APP_ENV}/certs/key.pem`),
    cert: fs.readFileSync(`${ROOT_PATH}/app/config/${process.env.APP_ENV}/certs/cert.pem`),
})

export default server
