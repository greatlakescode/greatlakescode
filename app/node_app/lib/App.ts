require('source-map-support').install();


import EmailBasedAuthController from "./controllers/auth/EmailBasedAuthController";
import KanbanController from "./controllers/kanban/KanbanController";
import NotesController from "./controllers/notes/NotesController";
import BasicAuthController from "./controllers/auth/BasicAuthController";
import WeatherController from "./controllers/weather/WeatherController";
import MongoDBHelper from "./utils/MongoDBHelper";
import ProfileController from "./controllers/profile/ProfileController";
import User from "./data/User";
import TVController from "./controllers/tv/TVController";
import SteamController from "./controllers/steam/SteamController";
import SecureDocsController from "./controllers/secure-docs/SecureDocsController";
//https://stackoverflow.com/questions/42088007/is-there-source-map-support-for-typescript-in-node-nodemon


const express = require('express');
export default class App {

    constructor(opts?) {

    }

    protected app;
    protected port;

    protected mongoDB;

    async init() {

        // BaseFileWriter

        // throw new Error(`error`);
        //TODO watch .env
//https://github.com/remy/nodemon/issues/1357

        this.mongoDB = await MongoDBHelper.getDB();

        const path = require('path');
        const express = require('express');
        let app = express();
        this.app = app;
        const port = process.env.GREATLAKESCODE_PORT || 3000;
        console.log(`port ${port}`);
        this.port = port;
        this.basicAppSetup();
//3000 for the main app testing locally, 4000 are reserved for standalone
//on production 3 main processes are running. 1 is dedicated as the main in app2.pm2.config.js and
//the other 2 are backup processes. But they all process requests in the same way.
//IP hashing is setup to allow for socket io type processing.


        await this.addControllers();


    }

    static async startApp(opts?) {
        let mainApp = new App(opts);

        await mainApp.init();
    }

    async addControllers() {
        let db = this.mongoDB;
        let app = this.app;


        await this.addAuthentication();

        //fallback authentication
        await this.addBasicAuthentication();

        app.use('*', function(req,res,next) {
           req.locals._User = new User(req.locals._user);
           next();
        });


        await (async function() {
            let route = '/api/profile';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize ${route}`);

            await ProfileController.initController({
                db,
                router
            });
            let t2 = Date.now();
            let d1 = t2 - t1;
            console.log(`initialized ${route} in ${d1} (ms)`);
        })();


        //add tv
        await (async function() {
            let route = '/api/tv';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize ${route}`);

            await TVController.initController({
                db,
                router
            });
            let t2 = Date.now();
            let d1 = t2 - t1;
            console.log(`initialized ${route} in ${d1} (ms)`);
        })();



        //add steam
        await (async function() {
            let route = '/api/steam';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize ${route}`);

            await SteamController.initController({
                db,
                router
            });
            let t2 = Date.now();
            let d1 = t2 - t1;
            console.log(`initialized ${route} in ${d1} (ms)`);
        })();


        //add secure-docs
        await (async function() {
            let route = '/api/secure-docs';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize ${route}`);

            await SecureDocsController.initController({
                db,
                router
            });
            let t2 = Date.now();
            let d1 = t2 - t1;
            console.log(`initialized ${route} in ${d1} (ms)`);
        })();



        await this.addWeather();

        await this.addKanban();

        await this.addNotes();

    }

    async addWeather() {
        let app = this.app;

        let router = express.Router();
        app.use('/api/weather', router);


        let controller = new WeatherController({
            router
        });

        await controller.init();
    }



    async addNotes() {
        let app = this.app;

        let router = express.Router();
        app.use('/api/notes-api', router);
        console.log(`adding addLocalNotes`);


        let controller = new NotesController({
            router
        });

        await controller.init();
    }


    async addKanban()
    {
        let app = this.app;

        //TODO add option to allow basic auth against this module
        let router = express.Router();
        // app.use('/api/auth', router);
        app.use('/api/kanban', router);

        let controller = new KanbanController({
            router
        });

        await controller.init();
    }


    async addBasicAuthentication() {

        let app = this.app;

        let db = this.mongoDB;

        await (async function() {
            let route = '/';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize basic-auth ${route}`);

            await BasicAuthController.initController({
                db,
                router
            });
            let t2 = Date.now();
            let d1 = t2 - t1;
            console.log(`initialized basic-auth ${route} in ${d1} (ms)`);
        })();
    }

    async addAuthentication() {


        let app = this.app;

        let db = this.mongoDB;

        await (async function() {
            let route = '/';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize email-auth ${route}`);

            await EmailBasedAuthController.initController({
                db,
                router
            });
            let t2 = Date.now();
            let d1 = t2 - t1;
            console.log(`initialized email-auth ${route} in ${d1} (ms)`);
        })();

        // let app = this.app;
        //
        // //TODO add option to allow basic auth against this module
        // let router = express.Router();
        // // app.use('/api/auth', router);
        // app.use('/', router);
        //
        // let controller = new EmailBasedAuthController({
        //     router
        // });
        //
        // await controller.init();

    }


    basicAppSetup() {
        let app = this.app;
        app.all('*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Headers", "*");

            next();
        });

        app.all('*', function (req, res, next) {
            if (req.method == 'OPTIONS') {
                return res.status(200).send();
            }
            next();
        });

        let bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded());
        app.use(bodyParser.json());


        app.listen(this.port, () =>
            console.log(`Example app listening on port ${this.port}!`
            ));


    }


    addPingModule() {

        let app = this.app;
        let router = express.Router();
        app.use('/ping', router);
        console.log(`adding coderuss-test`);
        require('coderuss-ping')({
            router
        });
    }


    addTestModule() {
        let app = this.app;

        let router = express.Router();
        app.use('/test', router);
        console.log(`adding coderuss-test`);
        require('coderuss-test')({
            router
        });
    }


//defaults to PORT 3005

    addTicketModuleStandalone(port = 3008) {
        // let router = express.Router();
        // app.use('/', router);
        console.log(`adding addTicketModuleStandalone`);
        require('coderuss-ticket')({
            port
        });
    }


//no auth required. If auth is required use middleware to populate req.locals securely.
    addFrontendExamples() {
        let app = this.app;

        // let router = express.Router();
        let router = express.Router();
        app.use('/frontend', router);
        console.log(`adding addFrontendExamples`);
        require('coderuss-frontend-test')({
            // port,
            router
        });
    }


}