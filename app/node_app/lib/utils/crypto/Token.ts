const crypto = require('crypto');


export default class Token
{


    static async getToken(size = 64)
    {
        let token = crypto.randomBytes(size).toString('hex');
        return token;
    }

}