import server from '../server'

server.createRoute({ methods: ['POST'], url: '/api/error' }, async (req, res) => {
    res.jsonError(400, 'This is error message')
})

server.createRoute({ methods: ['POST'], url: '/api/success' }, async (req, res) => {
    res.jsonData('This is good request')
})
