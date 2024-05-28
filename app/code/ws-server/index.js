import { WebSocketServer } from 'ws'
import server from '../web-server/server'
import connection from './connection'

const wss = new WebSocketServer({ noServer: true })

wss.on('connection', async (client) => connection(client, wss))

server.server.on('upgrade', (req, socket, head) => {
    if (req.url === '/socket') {
        wss.handleUpgrade(req, socket, head, (client) => {
            wss.emit('connection', client, req)
        })
    }
})

export default wss
