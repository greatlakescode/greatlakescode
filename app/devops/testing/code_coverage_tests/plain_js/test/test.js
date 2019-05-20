let index = require('./../index.js');
let request = require('request');

index.testFunction1();
index.testFunction2(false);
index.testFunction2(true);


( async () => {
    console.log(`init express`);
// await wait();
    await index.initExpress();
    console.log(`init express done 1`);


    await (async function ()
    {
        return new Promise((done) => {
            let options = { method: 'GET',
                url: "http://localhost:8009",
                headers:
                    {
                    },
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                done();
            });

        })
    });


    console.log(`close express`);
    await index.closeExpress();
    console.log(`close express done 1`);




})();


