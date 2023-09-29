import BaseModel from './base-model'

export default class User extends BaseModel {
    constructor(data) {
        const fields = {
            id: null,
            name: null,
            age: null,
        }
        super(fields, data)
        this.prefix = User.prefix
    }

    static prefix = 'users'

    // static async findOneBy(conditions = {}) {
    //     return BaseModel.findOneBy(conditions, this.prefix)
    // }
}
