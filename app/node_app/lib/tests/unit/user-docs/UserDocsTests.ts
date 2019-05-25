import MongoDBHelper from "../../../utils/MongoDBHelper";
import SecureDocsService from "../../../services/secure-docs/SecureDocsService";
import App from "../../../App";
import BaseUnitTests from "../BaseUnitTests";
import UserDocsService from "../../../services/user-docs/UserDocsService";
const path = require('path');

const expect = require('chai').expect;

export default class UserDocsTests
    extends BaseUnitTests
{

    db;
    userDocsService;
    username = `russj@greatlakescode.us`;

    async init()
    {
        await super.init();
        this.userDocsService = await UserDocsService.initService({
            db: this.db
        });
    }


    async run()
    {
        console.log(`running tests`,this.constructor.name);

        let repoPath = App.repoPath;
        let testFile = path.resolve(repoPath,'app/node_app/lib/tests/unit/user-docs/test.txt');

        console.log(`testFile`,testFile);

        let doc = await this.userDocsService.addDoc({
            filename: `test.txt`,
            file_absolute_path: testFile,
            username: `russj@greatlakescode.us`,
        });

        console.log(`created doc`,doc);

        await this.testFetchUserDocs();

        await this.testDeleteAllUserDocs();

    }

    async testFetchUserDocs()
    {
        let username = this.username;
        let result = await this.userDocsService.getUserDocs(username);
        console.log(result);
    }


    async testDeleteAllUserDocs()
    {
        let username = this.username;

        let results = await this.userDocsService.getUserDocs(username);

        for (let doc of results)
        {
            console.log(`delete doc`,doc.id,doc.filename);
            let result = await this.userDocsService.deleteUserDoc(username,doc.id);
            console.log(`deleted doc`,result);

        }

        // let username = this.username;
        // let result = await this.userDocsService.deleteAllUserDocs(username);
        // console.log(result);
    }



}



if (require.main === module) {
    UserDocsTests.runAsScript(true);
}