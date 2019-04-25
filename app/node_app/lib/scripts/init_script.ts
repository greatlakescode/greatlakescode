import MongoDBHelper from "../utils/MongoDBHelper";

module.exports = async function (opts?) {

    console.log(`init_script`);
    let result = await require('./../init')();
    return result;


};
