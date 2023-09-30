import BaseModel from './base-model'

export default class Channel extends BaseModel {
    constructor(data, created = true) {
        const fields = {
            id: null,
            channel_id: null,
            display_name: null,
            platform: null,
            image_url: null,
            blocked: null,
            foreign_id: null,
            num: 10,
        }
        super(fields, data, created)
    }

    static fields = {
        id: { index: true, default: 10, indexed: true, type: BaseModel.STRING},
    }

    static prefix = 'channels'

    static numberIndexes = ['num']

    static stringIndexes = ['channel_id', 'display_name', 'platform', 'foreign_id']
}
