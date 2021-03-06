import UserDocsController from "./controllers/user-docs/UserDocsController";

require('source-map-support').install();
const path = require('path');

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


    static instance;


    static get repoPath()
    {
        return process.env._GREATLAKESCODE_REPO_PATH;
    }

    //store singleton
    constructor(opts?) {
        opts = opts || {};
        App.instance = this;

        this.script_only = opts.script_only;
    }

    protected app;
    protected server;
    protected port;

    protected script_only;

    protected mongoDB;

    protected start_date;


    static async staticShutdown()
    {
        await App.instance.shutdown();
        console.log(`finished shutdown`);
    }

    async shutdown()
    {
        console.log(`shutdown server`,this.server);
        this.server.close();
        console.log(`shutdown server finished`,this.server);


        console.log(`close mongo`);
        MongoDBHelper.closeClient();
        console.log(`close mongo finished`);




    }


    async init() {


        this.start_date = new Date();

        this.mongoDB = await MongoDBHelper.getDB();

        if (this.script_only)
        {
            return;
        }

        const path = require('path');



        const express = require('express');
        let app = express();
        this.app = app;
        const port = process.env.GREATLAKESCODE_PORT || 3005;
        console.log(`port ${port}`);
        this.port = port;
        this.basicAppSetup();

        await this.addControllers();


    }

    /**
     * Main entry point for the rest api
     * @param opts
     */
    static async startApp(opts?) {
        let mainApp = new App(opts);

        await mainApp.init();

        return mainApp;
    }

    async addControllers() {
        let db = this.mongoDB;
        let app = this.app;


        await this.addAuthentication();

        //fallback authentication
        // await this.addBasicAuthentication();

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


        //add user-docs
        await (async function() {
            let route = '/api/user-docs';
            let router = express.Router();
            app.use(route, router);
            let t1 = Date.now();
            console.log(`initialize ${route}`);

            await UserDocsController.initController({
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

        await this.addPing();

    }

    async addPing()
    {
        let self = this;
        function ping(req,res)
        {
            let server = self.getServerInfo();

            return res.json({
                server
            });
        }


        this.app.use('/', ping);
    }


    getServerInfo()
    {
        return {
            port: this.port,
            start_date: this.start_date
        }
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
        let multer  = require('multer');
        let upload = multer();

        let app = this.app;
        app.all('*', (req, res, next) => {
            console.log(`app request`,res.method);
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


        /**
         * allow formdata
         */
        // app.post('*', upload.none(), function (req, res, next) {
        //     next();
        // });

        let bodyParser = require('body-parser');
        // app.use(bodyParser.urlencoded());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());


        this.server = app.listen(this.port, () =>
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
