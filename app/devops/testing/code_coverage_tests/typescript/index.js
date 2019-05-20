let ExpressServer = require('./dist/ExpressServer');


console.log(ExpressServer);

// import ExpressServer from "./src/ExpressServer";

let x = 1;

let server;


let expressServer = ExpressServer();



module.exports = {
    testFunction1: function()
    {
        console.log('success');
    },
    testFunction2: function(isTrue)
    {
        if (isTrue)
        {
            console.log('1');

        }
        else {
            console.log('2');
        }
    },
    initExpress: async function()
    {
        server = await expressServer.init();
    },
    closeExpress: async function()
    {
        // expressServer.close();
        server.close();
    }
};



