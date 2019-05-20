import MongoDBHelper from "../../../utils/MongoDBHelper";

export default class SecureDocsTests
{

    db;

    constructor(opts?)
    {
        opts = opts || {};
        console.log(this.constructor.name);
        this.db = opts.db;
    }

    async init()
    {
        if (!this.db)
        {
            this.db = await MongoDBHelper.getDB();
        }
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
            await SecureDocsTests.createAndRun();

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
    SecureDocsTests.runAsScript();
}