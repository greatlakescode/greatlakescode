
export default class BaseUtil
{




    constructor(opts?)
    {
    }

    static async create(opts):Promise<any>
    {
        let obj = new this(opts);
        await obj.init();
        return obj;
    }


    async init()
    {
    }

}