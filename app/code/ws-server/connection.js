export default (client, wss) => {
    global.logger.log('incoming connection', wss.clients.size)

    client.send(JSON.stringify({ text: 'hello' }))

    client.on('message', (message) => {
        global.logger.log('Received message from client:', message)
    })

    client.on('close', () => {
        global.logger.log('connection closed', wss.clients.size)
    })

    client.on('error', global.logger.error)
}
