// const basicAuth = require('express-basic-auth');

import BaseMongoDBController from "../BaseMongoDBController";
import User from "../../data/User";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
let db;


const request = require('request');


//https://openweathermap.org/api
//https://home.openweathermap.org/api_keys
export default class WeatherController
    extends BaseMongoDBController
{

    // protected router;


    //default database to store user details. Can potentially be shared by others?
    defaultDBName = 'weather';

    OPEN_WEATHER_MAP_API_KEY;

    constructor(protected opts: {
        router,
        dbName?,
        mongoDbUrl?
    }) {
        super(opts);
        console.log(`constructed`,this.constructor.name,this.defaultDBName, this.dbName,this.mongoDbUrl)

        this.OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

        if (!this.OPEN_WEATHER_MAP_API_KEY)
        {
            console.log(`process.env.OPEN_WEATHER_MAP_API_KEY must be set`);
            process.exit(1);
        }


    }


    protected async getDB()
    {
        return this.clientConnection();
    }


    async init() {
        let self = this;
        let router = this.router;
        let db = await this.getDB();

        let pingCollection = db.collection('ping');

        pingCollection.insertOne({now:Date.now(),message:'init kanban'});


        router.get('/',(req,res) => {
            res.send(`hello from weather controller
            /me GET - get user info.
            `);
        });

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

        //https://samples.openweathermap.org/data/2.5/weather?zip=94040,us&appid=b6907d289e10d714a6e88b30761fae22

        //can use req.auth for other user / password info?
        router.get('/me', (req, res) => {

            let user = req.locals._user;
            res.json(user);
        });


        /**
         * Get a summary of my weather based on zip.
         */
        router.get('/my-weather', (req,res) => {

            let user:User = req.locals._User;

            let zip = user.zip;
            console.log(`user ${zip}`,user.json);

            let requestOpts = {
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather',
                headers: {
                    'content-type': 'application/json'
                },
                qs: {
                    zip,
                    APPID: self.OPEN_WEATHER_MAP_API_KEY
                }
            };


            request(requestOpts, (err,response,body) => {
                // console.log(err,response,body);


                let {headers} = response;
                // console.log(body,requestOpts,headers);


                // res.json(body);
                res.send(body);

            })



        });


        //http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
        //https://openweathermap.org/appid

        //openweathermap.org/data/2.5/weather?zip=94040,us&appid=b6907d289e10d714a6e88b30761fae22
        //http://localhost:3000/api/weather/weather?zip=48336,us
        router.get('/weather', (req,res) => {

            let {zip} = req.query;

            let requestOpts = {
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather',
                headers: {
                    'content-type': 'application/json'
                },
                qs: {
                    zip,
                    APPID: self.OPEN_WEATHER_MAP_API_KEY
                }
            }


            request(requestOpts, (err,response,body) => {
                console.log(err,response,body);


                let {headers} = response;
                console.log(body,requestOpts,headers);


                // res.json(body);
                res.send(body);

            })



        });




    }



}



