import MongoDBHelper from "../../../utils/MongoDBHelper";
import SecureDocsService from "../../../services/secure-docs/SecureDocsService";
import App from "../../../App";
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

    async init()
    {
        if (!this.db)
        {
            this.db = await MongoDBHelper.getDB();
        }


        this.secureDocsService = await SecureDocsService.initService({
            db: this.db
        });
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

        let repoPath = App.repoPath;
        let testFile = path.resolve(repoPath,'app/node_app/lib/tests/unit/secure-docs/test.txt');

        console.log(`testFile`,testFile);

        let doc = await this.secureDocsService.addDoc({
            filename: `test.txt`,
            file_absolute_path: testFile,
            username: `russjohnson09@gmail.com`,
            allowed_access: [
                {
                    type: 'email_verify',
                    email: 'russjohnson09@gmail.com',
                    expires: '0' //never expires
                }
            ],
        });

        console.log(`created doc`,doc);


        await this.verifyDocRequestSend(doc);



    }


    async verifyDocRequestSend(doc)
    {
        await this.secureDocsService.doVerifyEmailRequest(doc.id,'russjohnson09@gmail.com');

    }



    static async runAsScript()
    {
        try {
            await require('./../../../init')();
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