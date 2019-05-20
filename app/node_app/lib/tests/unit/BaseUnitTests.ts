import MongoDBHelper from "../../utils/MongoDBHelper";

const path = require('path');

export default class SecureDocsTests
{

    db;
    secureDocsService;

    constructor(opts?)
    {
        opts = opts || {};
        console.log(this.constructor.name);
        this.db = opts.db;
    }


    async initDB()
    {
        if (!this.db)
        {
            this.db = await MongoDBHelper.getDB();
        }
    }

    async init()
    {
        await this.initDB();
    }

    static async createAndRun(opts?)
    {
        let obj = await this.create(opts);
        await obj.run();

        return obj;
    }

    static async create(opts?)
    {
        let self = this;
        let obj = new self(opts);

        await obj.init();

        return obj;

    }


    async run()
    {
        console.log(`running tests`,this.constructor.name);

    }




    static async runAsScript()
    {
        try {
            console.log(`${this.constructor.name} runAsScript`)
            await require('./../../init')();
            await this.createAndRun();
            console.log(`finished tests`);
            setTimeout(() => {
                process.exit(0);
            },1000);
        }
        catch (e)
        {
            console.error(e);
        }
    }


}



if (require.main === module) {

}