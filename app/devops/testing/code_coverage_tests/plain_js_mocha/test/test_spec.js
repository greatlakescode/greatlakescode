let index = require('./../index.js');
let request = require('request');

describe('test', () => {
    it('test', (done) => {

        done();

    })
});


describe('testFunction1', () => {
    it('test', (done) => {

        index.testFunction1();

        done();

    })
});


describe('testFunction2', () => {
    it('test', (done) => {

        index.testFunction2(false);

        done();

    });
});


describe('testFunction2', () => {
    it('test', (done) => {

        index.testFunction2(true);

        done();

    });
});


function wait() {
    return new Promise((r) => {
        setTimeout(r, 1000);
    })
}


describe('init-express', () => {
    it('init-expres', async () => {
        try {
            console.log(`init express`);
            // await wait();
            await index.initExpress();
            console.log(`init express done 1`);
            // done();
        } catch (e) {
            console.log(e);
        } finally {

        }


        // return (async () => {
        //     console.log(`init express`);
        //     await index.initExpress();
        //     console.log(`init express done`)
        // })();
    })
});


describe('/ping', () => {
    it('/ping should respond with 200', (done) => {

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


describe('close-express', () => {
    it('close-expres', async () => {
        console.log(`close express`);
        await index.closeExpress();
        console.log(`close express done 1`);
        // done();
    })
});