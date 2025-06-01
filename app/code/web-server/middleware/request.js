import utils from 'imagic-utils'
import server from '../server'

server.use(async (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
        const chunks = []
        req.on('data', (chunk) => {
            chunks.push(chunk)
        })

        req.on('end', () => {
            const data = Buffer.concat(chunks).toString()
            if (data) {
                if (utils.isJSON(data)) {
                    req.json = JSON.parse(data)
                    next()
                } else {
                    res.jsonError('INVALID_JSON', null)
                }
            } else {
                next()
            }
        })
    } else {
        next()
    }
})
