const path = require('path');
const fs = require("fs");

let envFilePath;

if (fs.existsSync(path.resolve(__dirname,'.env')))
{
    console.log(`using local .env file`);
    envFilePath = path.resolve(__dirname,'.env')
}
else if (fs.existsSync('/home/ubuntu/.keys/.global-env'))
{
    console.log(`using global .env file`);
    envFilePath = '/home/ubuntu/.keys/.global-env';
}

if (envFilePath)
{
    console.log(`using env file ${envFilePath}`);
    require('dotenv').config({path:envFilePath});

}
else {
    console.log(`using env file ${envFilePath}`);

    require('dotenv').config();
}

require('source-map-support').install();

require('./dist/start_app')({

})
