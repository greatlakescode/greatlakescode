import MongoDBHelper from "./utils/MongoDBHelper";


module.exports = async function (opts?) {

    const path = require('path');
    let envConfigFile = path.resolve(`..`,`..`,`..`,`.env`);
    console.log(`envConfigFile`,envConfigFile);
    require('dotenv').config({
        path: envConfigFile
    });

    console.log(`init`);

    process.env._GREATLAKESCODE_REPO_PATH =
        path.resolve(`..`,`..`);

    process.env._GREATLAKESCODE_TMP_PATH =
        path.resolve(process.env._GREATLAKESCODE_REPO_PATH,`tmp`);

    process.env._GREATLAKESCODE_FILE_PATH =
        path.resolve(process.env._GREATLAKESCODE_REPO_PATH,`files`);

    console.log(`init`,process.env._GREATLAKESCODE_REPO_PATH,
        process.env._GREATLAKESCODE_TMP_PATH,
    );

    console.log(`init`,process.env._GREATLAKESCODE_REPO_PATH,
        process.env._GREATLAKESCODE_FILE_PATH,
    );

    let mongoDB = await MongoDBHelper.getDB();


    return {
        db: mongoDB
    }


};