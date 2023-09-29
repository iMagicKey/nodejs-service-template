import redis from 'redis'

export default class Redis {
    static client = null

    static async connect() {
        if (this.client === null) {
            this.client = redis.createClient(global.config.db.redis)
            this.client.on('error', (err) => global.logger.perror('REDIS', err))
            await this.client.connect()
        }

        return this.client
    }

    static disconnect() {}
}
