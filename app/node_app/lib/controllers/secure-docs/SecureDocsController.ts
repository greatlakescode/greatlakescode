//https://store.steampowered.com/api/appdetails?appids=57690

//http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json

//https://stackoverflow.com/questions/46330864/steam-api-all-games

//https://partner.steamgames.com/doc/webapi/ISteamApps


// const basicAuth = require('express-basic-auth');

import BaseMongoDBController from "../BaseMongoDBController";
import User from "../../data/User";
import BaseController from "../BaseController";
import TVMazeRequest from "../../utils/tv-maze/TVMazeRequest";
import MongoDBHelper from "../../utils/MongoDBHelper";
import SteamRequest from "../../utils/steam/SteamRequest";
import SteamService from "../../services/steam/SteamService";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
let db;


//http://api.tvmaze.com/search/shows?q=girls
const request = require('request');


export default class SecureDocsController
    extends BaseController
{


    secureDocsService:SteamService;

    /**
     * Initialize any services used by the controller.
     */
    async initServices()
    {
        this.secureDocsService = await SteamService.initService({
            db: this.db
        });
    }

    async initRoutes()
    {

        let self = this;
        let router = this.router;
        let secureDocsService = this.secureDocsService;
        // let showCollection = db.collection('show');


        //cache games daily / hourly?
        router.get('/',(req,res) => {
            res.send(`hello from secure doc controller
/public/secure-doc/:id request a secure doc

/my/secure-doc get list of users secure docs

/secure-doc/:id get doc by id
            `);
        });




        //login required beyond this point
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


    }


}



