import BaseModel from './base-model'

export default class Channel extends BaseModel {
    constructor(data) {
        super(data)
    }

    static fields = {
        id: {
            type: BaseModel.NUMBER,
        },
        channel_id: {
            type: BaseModel.STRING,
            index: true,
        },
        display_name: {
            type: BaseModel.STRING,
            index: true,
        },
        platform: {
            type: BaseModel.STRING,
            index: true,
        },
        image_url: {
            type: BaseModel.STRING,
        },
        blocked: {
            type: BaseModel.STRING,
            index: true,
        },
        foreign_id: {
            type: BaseModel.STRING,
            index: true,
        },
        num: {
            type: BaseModel.NUMBER,
            default: 10,
            index: true,
        },
    }

    static prefix = 'channels'

    static numberIndexes = ['num']

    static stringIndexes = ['channel_id', 'display_name', 'platform', 'foreign_id']
}
