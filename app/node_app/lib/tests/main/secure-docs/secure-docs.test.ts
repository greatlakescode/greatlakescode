import App from "../../../App";
import SecureDocsService from "../../../services/secure-docs/SecureDocsService";

let expect = require('chai').expect;
const request = require("request");

let port = 3000;
let baseApi = `http://localhost:${port}/api`;

let app;


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

        app = await App.startApp({
            script_only: true
        });
    })
});


describe('test docs', function() {
    this.timeout(10 * 1000);
    it('test docs', async function() {

        this.secureDocsService = await SecureDocsService.initService({
            db: app.mongoDB
        });

    })
});

