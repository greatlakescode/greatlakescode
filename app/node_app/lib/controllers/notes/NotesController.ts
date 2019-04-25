import BaseMongoDBController from "../BaseMongoDBController";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
let db;


export default class NotesController
    extends BaseMongoDBController
{

    // protected router;


    //default database to store user details. Can potentially be shared by others?
    defaultDBName = 'notes';


    protected async getDB()
    {
        return this.clientConnection();
    }


    async init() {
        let db = await this.getDB();

        let pingCollection = db.collection('ping');
        pingCollection.insertOne({now:Date.now(),message:'init ' + this.constructor.name});
        await this.initRoutes();

    }


    async initRoutes()
    {
        let router = this.router;
        let db = await this.getDB();



        router.use('',(req,res,next) => {
            req.locals = req.locals || {};
            next();
        });


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
            // user = {username: 'test'}; //TODO remove
            if (user && user.username)
            {
                console.log(`logged in as ${user.username}`);
                next();
            }
            else {
                res.status(401).json({
                    'not ok': 'not ok'
                });
            }
        });



        //can use req.auth for other user / password info?
        router.get('/me', (req, res) => {
            let user = req.locals._user;
            res.json(user);
        });








        //mongodb assumed local only
        //collection name and database name?
        //localhost:27017
        //TODO move notes to its own controller?
        //connect to mongodb as part of the notes
        //https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition
        router.get('/notes', async (req, res) => {
            console.log(`get notes`);
            let result = await db.collection('notes').find({}).toArray();
            console.log(`notes`,result);
            // let {docs} = result;
            res.json(result);
        });


        //200 response for post
        router.post('/notes', async (req, res) => {
            let user = req.locals._user;
            let body = req.body;
            console.log(`post body`,body);
            let note = {
                username: user.username,
                note: req.body, //object containing the note
            };
            await insertMany(`notes`,[note]);
            res.json({
                'ok': 'ok'
            });
        });
        //update notes
        router.post('/notes/:id', (req, res) => {
            res.json({
                'ok': 'ok'
            });
        });
    }



}



