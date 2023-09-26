import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { exec, execSync } from 'child_process'

const ROOT_PATH = resolve()
const CERTS_DIR_PATH = `${ROOT_PATH}/app/config/${process.argv[2]}/certs`

if (!existsSync(CERTS_DIR_PATH)) mkdirSync(CERTS_DIR_PATH)

exec(
    `ip -4 addr | grep -oP '(?<=inet\\s)\\d+(\\.\\d+){3}' | grep -vE '^(127|10|172\\.(1[6-9]|2[0-9]|3[0-1])|192\\.168)\\.' | head -1`,
    (error, stdout, stderr) => {
        if (error || stderr) throw Error(`Can't find IPv4`)
        const IPv4 = stdout.trim()

        execSync(
            // eslint-disable-next-line max-len
            `openssl req -newkey rsa:2048 -sha256 -nodes -keyout key.pem -x509 -days 9999 -out cert.pem -subj "/C=US/ST=New York/L=Brooklyn/O=Example Brooklyn Company/CN=${IPv4}"`,
            { cwd: CERTS_DIR_PATH, stdio: 'ignore' }
        )
        console.log(`Certs installed in ${CERTS_DIR_PATH}`)
    }
)
