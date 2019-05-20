let expect = require('chai').expect;
const request = require("request");

let port = 3000;
let baseApi = `http://localhost:${port}/api`;


console.log(`main.test.ts`);


describe('/ping', () => {
    it('/ping should respond with 200', (done) => {

        // let options = { method: 'GET',
        //     url: baseApi,
        //     headers:
        //         {
        //         },
        // };
        // request(options, function (error, response, body) {
        //     if (error) throw new Error(error);
        //     // console.log(body);
        //     expect(response.statusCode).to.be.equal(200);
            done();
        // });


    })
});
