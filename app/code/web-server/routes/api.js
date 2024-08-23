import utils from 'imagic-utils'
import server from '../server'

server.createRoute({ methods: ['POST'], url: '/api/error' }, async (req, res) => {
    res.jsonError(400, 'This is error message')
})

server.createRoute({ methods: ['POST'], url: '/api/counter' }, async (req, res) => {
    const amount = req.json?.amount || 2

    await utils.wait(2000)

    return res.jsonData(amount)
})
