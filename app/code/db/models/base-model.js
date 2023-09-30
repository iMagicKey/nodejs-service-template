import crypto from 'crypto'
import Redis from '../index'

export default class BaseModel {
    constructor(defaultValues, data, created) {
        this.modelFields = { ...defaultValues }
        this.previousFields = created ? { ...defaultValues } : { ...data }

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
                    if (fieldName !== 'id') {
                        this.modelFields[fieldName] = val
                    }
                },
            })
        })
    }

    static create(data) {
        return new this(data, true)
    }

    delete() {
        return Redis.client.del(`${this.constructor.prefix}:${this.id}`)
    }

    async save() {
        const timestamp = Date.now()
        if (this.modelFields.createdAt === null) {
            this.modelFields.createdAt = timestamp
        }

        this.modelFields.updatedAt = timestamp

        // eslint-disable-next-line no-shadow
        await Redis.client.json.set(`${this.constructor.prefix}:${this.id}`, '$', this.modelFields)
        await this.index()
        this.previousFields = { ...this.modelFields }
    }

    index() {
        // eslint-disable-next-line no-shadow
        return new Promise((resolve) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const stringIndex of this.constructor.stringIndexes) {
                if (this.modelFields[stringIndex] !== this.previousFields[stringIndex]) {
                    Redis.client.sRem(
                        `index:${this.constructor.prefix}:${stringIndex}:${this.previousFields[stringIndex]}`,
                        `${this.constructor.prefix}:${this.id}`
                    )
                    Redis.client.sAdd(
                        `index:${this.constructor.prefix}:${stringIndex}:${this.modelFields[stringIndex]}`,
                        `${this.constructor.prefix}:${this.id}`
                    )
                }
            }

            // eslint-disable-next-line no-restricted-syntax
            for (const numberIndex of this.constructor.numberIndexes) {
                if (this.modelFields[numberIndex] !== this.previousFields[numberIndex]) {
                    Redis.client.zRem(`index:${this.constructor.prefix}:${numberIndex}`, `${this.previousFields[numberIndex]}`)
                    Redis.client.zAdd(`index:${this.constructor.prefix}:${numberIndex}`, [
                        { score: this.modelFields[numberIndex], value: `${this.constructor.prefix}:${this.id}` },
                    ])
                }
            }
            resolve()
        })
    }

    static async findBy(conditions = {}, limit = 0, offset = 0) {
        const keys = Object.keys(conditions)
        const results = await Promise.all(
            keys
                .filter((val) => this.stringIndexes.includes(val) || this.numberIndexes.includes(val))
                // eslint-disable-next-line consistent-return
                .map(async (key) => {
                    if (this.numberIndexes.includes(key)) {
                        return {
                            key,
                            values: await Redis.client.zRangeByScore(`index:${this.prefix}:${key}`, conditions[key], conditions[key]),
                        }
                    }
                    if (this.stringIndexes.includes(key)) {
                        return { key, values: await Redis.client.sMembers(`index:${this.prefix}:${key}:${conditions[key]}`) }
                    }
                })
        )

        let entries = []
        if (results.length) {
            const commonValues = results.reduce((acc, { values }, index) => {
                if (index === 0) {
                    return values
                }
                return acc.filter((value) => values.includes(value))
            }, [])
            const entriesId = limit ? commonValues.slice(offset, offset + limit) : commonValues.slice(offset)
            entries = await Redis.client.json.mGet(entriesId, '$')
        } else {
            entries = await this.sysFindAll()
        }

        if (entries.length) {
            return entries
                .map((val) => val[0])
                .filter((entrie) => {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const key of keys) {
                        if (entrie[key] !== conditions[key]) {
                            return false
                        }
                    }

                    return true
                })
                .map((val) => new this(val, false))
        }

        return []
    }

    static async findOneBy(conditions = {}, offset = 0) {
        const entries = await this.findBy(conditions, 1, offset)
        return entries.length ? entries[0] : null
    }

    static async findAll() {
        return this.sysFindAll.map((val) => new this(val, false))
    }

    static async sysFindAll() {
        const keys = await Redis.client.keys(`${this.prefix}:*`)
        return keys ? Redis.client.json.mGet(keys, '$') : []
    }
}
