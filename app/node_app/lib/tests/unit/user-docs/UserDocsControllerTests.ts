import MongoDBHelper from "../../../utils/MongoDBHelper";
import SecureDocsService from "../../../services/secure-docs/SecureDocsService";
import App from "../../../App";
import BaseUnitTests from "../BaseUnitTests";
import UserDocsService from "../../../services/user-docs/UserDocsService";
import GlcRequestHelper from "../../../utils/request/GlcRequestHelper";
const path = require('path');

const expect = require('chai').expect;

export default class UserDocsControllerTests
    extends BaseUnitTests
{

    db;
    userDocsService;
    username = `russj@greatlakescode.us`;
    requestHelper;


    async init()
    {
        await super.init();
        this.userDocsService = await UserDocsService.initService({
            db: this.db
        });
        this.requestHelper = new GlcRequestHelper();
    }


    async run()
    {
        console.log(`running tests`,this.constructor.name);

        let repoPath = App.repoPath;
        let testFile = path.resolve(repoPath,'app/node_app/lib/tests/unit/user-docs/test.txt');

        console.log(`testFile`,testFile);

        let url = `/api/user-docs`;
        let result = await this.requestHelper.get({
            url
        });

        console.log(`api/user-docs`,result);

        expect(result.statusCode).to.be.equal(200);






    }



}



if (require.main === module) {
    UserDocsControllerTests.runAsScript(true);
}