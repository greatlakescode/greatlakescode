// const basicAuth = require('express-basic-auth');

import TeamController from "./TeamController";
import TicketController from "./TicketController";
import BaseMongoDBController from "../BaseMongoDBController";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
let db;


export default class KanbanController
extends BaseMongoDBController
{

    // protected router;


    //default database to store user details. Can potentially be shared by others?
    defaultDBName = 'kanban';

    constructor(protected opts: {
        router,
        dbName?,
        mongoDbUrl?
    }) {
        super(opts);
        console.log(`constructed`,this.constructor.name,this.defaultDBName, this.dbName,this.mongoDbUrl)

        // this.dbName = opts.dbName || this.defaultDBName;
        // this.mongoDbUrl = opts.mongoDbUrl || 'mongodb://localhost:27017';



    }


    protected async getDB()
    {
        return this.clientConnection();
    }


    async init() {
        let router = this.router;
        let db = await this.getDB();

        let pingCollection = db.collection('ping');

        pingCollection.insertOne({now:Date.now(),message:'init kanban'});


        router.get('/',(req,res) => {
            res.send(`hello from kanban controller
            /me GET - get user info.
            `);
        });


        //should not be necessary with auth endpoint already handling this beforehand.
        // router.use('',(req,res,next) => {
        //     req.locals = req.locals || {};
        //     next();
        // });

        router.get('/ping.json', (req, res) =>
            {
                res.json({
                    'ok': 'ok'
                });
            }
        );

        //confirm that the user is in fact logged in by a separate process
        router.use('*', (req, res,next) => {
            let user = req.locals._user;
            if (user && user.username)
            {
                console.log(`logged in as ${user.username}`);
                next();
            }
            else {
                //301 moved permenantly
                //302
                //401
                res.redirect(401, '/basic-auth/login'); //allow basic auth login against this? what will this affect?
            }
        });

        //can use req.auth for other user / password info?
        router.get('/me', (req, res) => {

            let user = req.locals._user;
            res.json(user);
        });

        (function() {
            const subrouter = require('express').Router();

            let c = new TeamController(subrouter,db);
            router.use('/team',subrouter);
        })();

        (function() {
            const subrouter = require('express').Router();

            let c = new TicketController(subrouter,db);
            router.use('/ticket',subrouter);
        })();

        router.get('/',(req,res) => {

            res.send(`
        hello from kanban
        `);
        });

    }



}



