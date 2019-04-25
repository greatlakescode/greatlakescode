export default class BaseService
{

    constructor(opts)
    {

    }

    static async initService(opts?):Promise<any>
    {
        let self = this;
        let obj = new self(opts);
        await obj.init();

        return obj;
    }


    async init()
    {

    }
}