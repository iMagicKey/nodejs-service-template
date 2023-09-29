import crypto from 'crypto'
import Redis from '../index'

export default class BaseModel {
    constructor(fields, data) {
        this.modelFields = fields

        const systemFields = ['updatedAt', 'createdAt']
        systemFields.forEach((systemField) => {
            if (systemField in this.modelFields === false) {
                this.modelFields[systemField] = null
            }
        })

        Object.keys(this.modelFields).forEach((fieldName) => {
            if (fieldName in data) {
                this.modelFields[fieldName] = data[fieldName]
            }

            if (fieldName === 'id' && !(fieldName in data)) {
                this.modelFields[fieldName] = crypto.randomBytes(16).toString('hex')
            }

            Object.defineProperty(this, fieldName, {
                get() {
                    return this.modelFields[fieldName]
                },
                set(val) {
                    this.modelFields[fieldName] = val
                },
            })
        })
    }

    static create(data) {
        return new this(data)
    }

    delete() {
        return Redis.client.del(`${this.prefix}:${this.id}`)
    }

    save() {
        const timestamp = Date.now()
        if (this.modelFields.createdAt === null) {
            this.modelFields.createdAt = timestamp
        }

        this.modelFields.updatedAt = timestamp
// console.log(Redis.client.json)
        return Redis.client.json.set(`${this.prefix}:${this.id}`, '$', this.modelFields)
        // return Redis.client.set(`${this.prefix}:${this.id}`, JSON.stringify(this.modelFields))
    }

    static async findBy(conditions = {}) {
        const keys = Object.keys(conditions)

        let entries = []

        if (keys.includes('id')) {
            const result = await Redis.client.get(`${this.prefix}:${conditions.id}`)
            if (result) {
                entries.push(JSON.parse(result))
            }
        } else {
            entries = await this.findAll()
        }

        entries = entries.filter((entrie) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key of keys) {
                if (entrie[key] !== conditions[key]) {
                    return false
                }
            }

            return true
        })

        return entries
    }

    static async findOneBy(conditions = {}) {
        const entries = await this.findBy(conditions)
        return entries.length ? entries[0] : null
    }

    static async findAll() {
        const keys = await Redis.client.keys(`${this.prefix}:*`)
        const data = await Redis.client.mGet(keys)

        return data.map((val) => new this(JSON.parse(val)))
    }
}
