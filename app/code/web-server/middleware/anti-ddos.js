import server from '../server'

server.use((req, res, next) => {
    if (req.method === 'GET' && req.url === '/affiliate') {
        if (Math.random() > 0.5) {
            next()
        } else {
            res.jsonError('STOP SPAM')
        }
    } else {
        next()
    }
})
