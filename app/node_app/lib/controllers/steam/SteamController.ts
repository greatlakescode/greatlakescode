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


//https://www.tvmaze.com/api
//skinny controller with a data source that defines
//what actions can be taken.
export default class SteamController
    extends BaseController
{


    steamService:SteamService;

    /**
     * Initialize any services used by the controller.
     */
    async initServices()
    {
        this.steamService = await SteamService.initService({
            db: this.db
        });

        // let steam_api_key = process.env.GREATLAKESCODE_STEAM_API_KEY;
        //
        // if (!steam_api_key)
        // {
        //     console.error(`steam_api_key required`);
        //     process.exit(1);
        // }
        //
        // this.steamService = new SteamService(
        //     {
        //         db: this.db,
        //         steam_api_key
        //     }
        // );

    }

    async initRoutes()
    {

        let self = this;
        let router = this.router;
        let steamService = this.steamService;
        // let showCollection = db.collection('show');


        //cache games daily / hourly?
        router.get('/',(req,res) => {
            res.send(`hello from weather controller
            /me GET - get user info.
/games GET - get games
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


        ////http://api.tvmaze.com/search/shows?q=girls
        router.get('/search', async (req,res) => {
            let {name} = req.query;
            let apps = await steamService.searchAppsByName(name);

            return res.json({
                data: apps
            });
        });


        router.post('/addtowishilist', async (req,res) => {
            let user = req.locals._User;
            let username = user.username;
            let appid = req.body.appid;
            let wanted_price = req.body.wanted_price;

            await this.steamService.addAppToWishlist(wanted_price,appid,username);

            res.json({
                'ok': 'ok'
            })
        });



        router.get('/getwishlist', async (req,res) => {
            let user = req.locals._User;
            let username = user.username;
            // let appid = req.body.appid;
            // let wanted_price = req.body.wanted_price;

            //includes full app details w/ name and other info?
            let results = await this.steamService.getAppWishlist(username);

            res.json({
                data: results
            })
        });


    }


}



