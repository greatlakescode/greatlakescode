
const express = require('express');
export default class App {

    constructor(opts?) {

    }

    protected app;
    protected port;


    async init() {


        const path = require('path');
        const express = require('express');
        let app = express();
        this.app = app;
        const port = process.env.RUSSJ_PORT || process.env.PORT || 9001; //default is 9000
        this.port = port;
        this.basicAppSetup();


        await this.addControllers();


    }

    static async startApp(opts?) {
        let mainApp = new App(opts);

        await mainApp.init();
    }

    async addControllers() {
        let app = this.app;


        await (async function() {
            let route = '/ping';
            let router = express.Router();
            app.use(route, router);

            router.use('/',(req,res) => {
                res.send(`ok`);
            });
        })()
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


        app.use('/',(req,res) => {
            res.send(`ok greatlakescode`);
        });


    }


}