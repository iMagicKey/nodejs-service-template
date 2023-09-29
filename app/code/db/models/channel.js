import BaseModel from './base-model'

export default class Channel extends BaseModel {
    constructor(data) {
        const fields = {
            id: null,
            channel_id: null,
            display_name: null,
            platform: null,
            image_url: null,
            blocked: null,
            foreign_id: null,
        }
        super(fields, data)
        this.prefix = Channel.prefix
    }

    static prefix = 'channels'
}
