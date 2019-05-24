
const jwt  = require('jsonwebtoken');


export default class JWT
{


    /**
     * Expires in an hour by default.
     * @param jsonObj
     * @param expires
     */
    static async createJsonWebToken(jsonObj,
                                    expires = (1000 * 60) * 60)
    {

    }


    static async verify(token)
    {

    }
}