
let x = 1;

let server;



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
        server = await require('./src/express_server')();
    },
    closeExpress: async function()
    {
        server.close();
        // return require('./src/express_server')();
    }
};



