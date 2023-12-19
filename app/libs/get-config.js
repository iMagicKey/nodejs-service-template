import fs from 'fs'
import utils from './utils'

export default () => {
    const config = {}

    const CONFIG_DIR = `./app/config/${process.env.APP_ENV}`
    const ENTRIES = fs.readdirSync(CONFIG_DIR)
    const CONFIG_FILES = ENTRIES.filter((val) => val.slice(-5) === '.json')

    CONFIG_FILES.forEach((configFile) => {
        const configName = configFile.slice(0, -5).toLowerCase()
        const configData = fs.readFileSync(`${CONFIG_DIR}/${configFile}`)

        if (utils.isJSON(configData) === true) {
            config[configName] = JSON.parse(configData)
        } else {
            throw Error(`Can't parse JSON config: ${CONFIG_DIR}/${configFile}`)
        }
    })

    return config
}
