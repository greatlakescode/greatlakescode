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

    process.env._RUSSJOHNSONIO_REPO_PATH =
        path.resolve(`..`,`..`,`..`);

    process.env._RUSSJOHNSONIO_TMP_PATH =
        path.resolve(process.env._RUSSJOHNSONIO_REPO_PATH,`lib`,`tmp`);


    console.log(`init`,process.env._RUSSJOHNSONIO_REPO_PATH,
        process.env._RUSSJOHNSONIO_TMP_PATH,
    );
    // process.exit(1);

    let mongoDB = await MongoDBHelper.getDB();


    return {
        db: mongoDB
    }


};