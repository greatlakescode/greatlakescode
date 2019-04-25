import BaseMongoDBController from "../BaseMongoDBController";
import BaseController from "../BaseController";
import MongoDBHelper from "../../utils/MongoDBHelper";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
let db;


export default class ProfileController extends
    BaseController
{



    // static async initController(opts:{
    //     db,
    //     router
    // })
    // {
    //     let self = this;
    //
    //     let obj = new self(opts);
    //     await obj.init();
    //
    //     return obj;
    // }

    // async init() {
    //     // let db = await this.getDB();
    //     // let pingCollection = db.collection('ping');
    //     // pingCollection.insertOne({now:Date.now(),message:'init ' + this.constructor.name});
    //     await this.initRoutes();
    // }


    async initRoutes()
    {
        console.log(`ProfileController->initRoutes`);
        let router = this.router;
        let db = await this.db;

        let userCollection = db.collection(`user`);

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
        //if logged in get the profile info.
        router.get('/', (req, res) => {
            let user = req.locals._user;
            res.json(user);
        });


        router.post('/update-settings', async (req, res) => {
            let user = req.locals._user;
            //get settings from req.body
            let foundUser1 = await userCollection.findOne({
                username: user.username
            });

            let {address1,address2} = req.body;
            // let _id = MongoDBHelper.getObjectID(user._id);

            let settings = {
            };
            for (let settingKey of [
                'address1',
                'address2',
                'city',
                'state',
                'zip',
                'phone',
                'first_name',
                'last_name'
            ])
            {
                settings[settingKey] = req.body[settingKey] === undefined ? foundUser1[settingKey]  : req.body[settingKey]
            }



            let updateResult = await userCollection.update({
                    username: user.username,
                },
                {
                    $set: {
                        //must pass full object that we want to set.
                        settings
                        //     {
                        //     city: '',
                        //     state: '',
                        //     address1: '',
                        //     address2: '',
                        //     phone: '',
                        //     zip: '',
                        //
                        // },
                    } //set updated team data.
                }
            );


            let foundUser = await userCollection.findOne({
                username: user.username
            });

            console.log(`foundUser`,foundUser);

            let userResponse = {
                _id: foundUser._id,
                username: foundUser.username,
                settings: foundUser.settings
            };



            res.json(userResponse);
        });


        //TODO update password
        router.post('/update-password', (req, res) => {
            let user = req.locals._user;
            let {password} = req.body;



            res.json(req.locals._User.json);
        });

    }



}



