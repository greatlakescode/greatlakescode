
let x = 1;




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
        return require('./src/express_server')();
    }
};



