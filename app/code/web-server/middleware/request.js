import utils from 'imagic-utils'
import server from '../server'

server.use(async (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
        const chunks = []
        req.on('data', (chunk) => {
            chunks.push(chunk)
        })

        req.on('end', () => {
            const data = chunks.join()
            if (data) {
                if (utils.isJSON(data)) {
                    req.json = JSON.parse(data)
                    next()
                } else {
                    res.jsonError(400, 'Invalid JSON')
                }
            } else {
                next()
            }
        })
    } else {
        next()
    }
})
