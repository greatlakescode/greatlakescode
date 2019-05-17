import MongoDBHelper from "./utils/MongoDBHelper";


module.exports = async function (opts?) {

    const path = require('path');
    let envConfigFile = path.resolve(`..`,`..`,`..`,`.env`);
    console.log(`envConfigFile`,envConfigFile);
    require('dotenv').config({
        path: envConfigFile
    });

    require('source-map-support').install();
    console.log(`init`);

    process.env._GREATLAKESCODE_REPO_PATH =
        path.resolve(`..`,`..`,`..`);

    process.env._GREATLAKESCODE_TMP_PATH =
        path.resolve(process.env._GREATLAKESCODE_REPO_PATH,`lib`,`tmp`);

    process.env._GREATLAKESCODE_FILE_PATH =
        path.resolve(process.env._GREATLAKESCODE_REPO_PATH,`lib`,`files`);

    console.log(`init`,process.env._GREATLAKESCODE_REPO_PATH,
        process.env._GREATLAKESCODE_TMP_PATH,
    );
    // process.exit(1);

    let mongoDB = await MongoDBHelper.getDB();


    return {
        db: mongoDB
    }


};