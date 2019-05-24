const bcrypt = require('bcrypt');
const saltRounds = 10;


export default class Password
{


    static async hash(password)
    {
        let result = await bcrypt.hash(password, saltRounds);
        return result;
    }


    static async compare(password,hash)
    {
        return bcrypt.compare(password,hash);
    }

}