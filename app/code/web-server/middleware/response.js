import server from '../server'

server.use((req, res, next) => {
    res.jsonError = (code, message) => {
        res.setHeader('content-type', 'application/json')
        return res.json({
            data: null,
            error: {
                code,
                message,
            },
        })
    }

    res.jsonData = (data) => {
        res.setHeader('content-type', 'application/json')
        return res.json({
            data,
            error: null,
        })
    }
    next()
})
