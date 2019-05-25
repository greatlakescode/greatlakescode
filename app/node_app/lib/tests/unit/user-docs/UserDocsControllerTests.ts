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
    user;
    requestHelper;


    async init()
    {
        await super.init();
        this.userDocsService = await UserDocsService.initService({
            db: this.db
        });
        this.requestHelper = new GlcRequestHelper();

        let username =  process.env.GREATLAKESCODE_TEST_ADMIN_USERNAME;
        let password = process.env.GREATLAKESCODE_TEST_ADMIN_PASSWORD;

        this.user =
            {
                username,
                password
            }

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


        await this.login();


        await this.getSelf();




    }


    async login()
    {
        let {
            username,
            password
        } = this.user;
        let url = `/login`;
        let result = await this.requestHelper.postFormData({
            url,
            formData: {
                username,
                password
            }
        });

        console.log(url,result);

        expect(result.statusCode).to.be.equal(200);
    }

    async getSelf()
    {
        let url = `/api/user-docs/me`;
        let result = await this.requestHelper.get({
            url,
            headers: {

            }
        });

        console.log(url,result);

        expect(result.statusCode).to.be.equal(200);
    }



}



if (require.main === module) {
    UserDocsControllerTests.runAsScript(true);
}