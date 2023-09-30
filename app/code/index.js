import fs from 'fs'
import Redis from './db'
import User from './db/models/user'
import Channel from './db/models/channel'

// eslint-disable-next-line func-names
export default async function () {
    await Redis.connect()

    // global.logger.log('log', 0, 0.23)
    // global.logger.error('error', 1)
    // global.logger.warn('warn', 2)
    // global.logger.debug('debug', 3)
    // global.logger.info('info', 4)
    // global.logger.crit('crit', 5)
    // global.logger.plog('LOG_PREFIX', 'log', 0)
    // global.logger.perror('ERROR_PREFIX', 'error', 1)
    // global.logger.pwarn('WARN_PREFIX', 'warn', 2)
    // global.logger.pdebug('DEBUF_PREFIX', 'debug', 3)
    // global.logger.pinfo('INFO_PREFIX', 'info', 4)
    // global.logger.pcrit('CRIT_PREFIX', 'info', 4)

    // const user = await User.findOneBy({ age: 12 })
    // const users = await User.findBy({ id: [ 1, 2, 3, 4] })
    // const users = await User.findAll()
    // const user = await User.create()
    // await user.delete()
    // await user.save()

    // const user = await User.create({
    //     name: 'Alex',
    //     age: 10,
    // })

    // console.log(await user.save()) // OK
    // console.log(user)
    // user.delete().then((res) => {
    //     console.log(res)
    // })

    // const user = await User.findOneBy({ id: '3c1e0f74016f351264517ca49424ab82', age: 4 })
    // console.log(user)

    // const users = await User.findBy({
    //     // id: '3c1e0f74016f351264517ca49424ab82',
    //     // age: 0,
    // })
    // console.log(users)

    // const users = await User.findAll()
    // console.log(users)
    // eslint-disable-next-line no-restricted-syntax
    // for (const user of users) {
    //     user.age = Math.floor(Math.random() * 10)
    //     user.save()
    // }

    const data = fs
        .readFileSync('./app/data/channels.csv', 'utf8')
        .split(/[\r\n]+/)
        .map((val) => {
            // eslint-disable-next-line no-unused-vars
            const [id, channelId, displayName, platform, imageUrl, updatedAt, createdAt, blocked, foreignId] = val.split(';')

            return {
                id: parseInt(id, 10),
                channel_id: channelId,
                display_name: displayName,
                platform,
                image_url: imageUrl,
                blocked: blocked !== '"0"',
                foreign_id: foreignId,
                createdAt: new Date(createdAt).getTime(),
                updatedAt: new Date(updatedAt).getTime(),
            }
        })

    const start = Date.now()

    const channel = Channel.create(data[0])
    channel.save()
    // console.log(data[0])
    // data.forEach((channelData) => {
    //     const allowedPlatforms = ['twitch', 'youtube', 'trovo', 'wasd']
    //     if (allowedPlatforms.includes(channelData.platform)) {
    //         const channel = Channel.create(channelData)
    //         channel.save()
    //     }
    // })
    // const channels = await Channel.findBy2({ platform: 'twitch', foreign_id: 699632104 })
    // const channels = await Channel.findBy2({
    //     // platform: 'twitch',
    //     blocked: true,
    //     // id: 42082,
    //     // foreign_id: 864465139,
    // })
    // // // const channels = await Channel.findAll()
    // // // const channel = await Channel.findOneBy({ display_name: 'iMagicKey' })
    // // // const channel = await Channel.findOneBy({ id: '1' })
    // console.log(channels)

    // const a1 = await Channel.findOneBy()
    // channel.id = 
    // channel.save()
    // console.log(a1)

    console.log((Date.now() - start) / 1000)
}
