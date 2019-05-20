import App from "../../App";

let expect = require('chai').expect;
const request = require("request");

let port = 3000;
let baseApi = `http://localhost:${port}/api`;


console.log(`main.test.ts`);



describe('setup', function() {
    this.timeout(10 * 1000)
    it('setup sever', async function() {

        console.log(`setup.test.ts setup sever`);

        const path = require('path');
        const fs = require("fs");
        console.log(__dirname);

        // console.log(process.env);
        //travis-ci will load these in separately.
        require('dotenv').config({path:path.resolve(__dirname,'..','..','..','.env')});

        let result = await require('./../../../dist/init')();

        await App.startApp({});

        expect(App.instance).not.to.be.undefined;


    })
});




describe('/ping', () => {
    it('/ping should respond with 200', (done) => {


        expect(App.instance).not.to.be.undefined;

        let options = { method: 'GET',
            url: baseApi,
            headers:
                {
                },
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            // console.log(body);
            expect(response.statusCode).to.be.equal(200);
            done();
        });


    })
});



// describe('shutdown server', function() {
//     this.timeout(10 * 1000);
//     it('shutdown server', async function() {
//         expect(App.instance).not.to.be.undefined;
//
//         await App.staticShutdown();
//
//
//         console.log(`finished shutdown`);
//
//     })
// });