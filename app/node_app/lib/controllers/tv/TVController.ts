// const basicAuth = require('express-basic-auth');

import BaseMongoDBController from "../BaseMongoDBController";
import User from "../../data/User";
import BaseController from "../BaseController";
import TVMazeRequest from "../../utils/tv-maze/TVMazeRequest";
import MongoDBHelper from "../../utils/MongoDBHelper";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
let db;


//http://api.tvmaze.com/search/shows?q=girls
const request = require('request');


//https://www.tvmaze.com/api
export default class TVController
    extends BaseController
{

    episode_watch_by_user;

    async init() {
        let self = this;
        let router = this.router;
        let db = await this.db;

        let pingCollection = db.collection('ping');
        self.episode_watch_by_user = db.collection('episode_watch_by_user');

        pingCollection.insertOne({now:Date.now(),message:'init tv'});

        let tvRequest = new TVMazeRequest();

        // let tvCollection = db.collection('tv');
        let showCollection = db.collection('show');


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

        ////http://api.tvmaze.com/search/shows?q=girls
        router.get('/search/shows', async (req,res) => {
            let result = await tvRequest.searchShows(req.query.q);
            return res.json(result);
        });

        router.post(`/my/shows/delete/:_id`, async(req,res) => {
            let user:User = req.locals._User;
            let username = user.username;

            let _id = MongoDBHelper.getObjectID(req.params._id);

            let result = await showCollection.deleteOne({
                username,
                _id
            });

            return res.json({
                _id: _id,
                result
            });



        });

        // tv/my/episodes/:id/update_count/4

        router.post(`/my/episodes/:id/update_count/:count`, async(req,res) => {
            let {id,count} = req.params;
            id = +id; //should not be a string.
            count = +count;
            let user:User = req.locals._User;
            let username = user.username;

            let c = this.episode_watch_by_user;

            let episodeWatch = await
                c.findOne({
                    episode_id: id,
                    username: user.username
                });
            console.log(episodeWatch);


            if (!episodeWatch)
            {
                console.log(`insert new episode_watch`);

                c.insertOne({
                    episode_id: id,
                    username: user.username,
                    seen_count: count
                });
            }
            else {
                c.updateOne({
                    episode_id: id,
                    username: user.username,
                }, {
                        $set: {
                            seen_count: count

                        }
                }

                   );
            }


            return res.json({
            });



        });


        router.get(`/my/shows`, async(req,res) => {
            let user:User = req.locals._User;
            let username = user.username;

            let shows = await showCollection.find({
                username,
            }).toArray();

            shows = await tvRequest.getShowsMainInfo(shows);

            await self.addSeenToShows(user,shows);


            return res.json({
                data: shows
            });



        });


        // Shows
        // Show main information
        // Retrieve all primary information for a given show. This endpoint allows embedding of additional information. See the section embedding for more information.
        //
        //     URL: /shows/:id
        // Example: http://api.tvmaze.com/shows/1
        //     Example: http://api.tvmaze.com/shows/1?embed=cast
        //         Show episode list
        // A complete list of episodes for the given show. Episodes are returned in their airing order, and include full episode information. By default, specials are not included in the list.
        //
        //     URL: /shows/:id/episodes
        // (optional) specials: do include specials in the list
        // Example: http://api.tvmaze.com/shows/1/episodes
        //     Example: http://api.tvmaze.com/shows/1/episodes?specials=1





        //store just the show ids by username
        router.post(`/my/shows/add`, async (req,res) => {
            // my/shows/add

            let {show_id} = req.body;

            if (!show_id)
            {
                return res.status(400).send('show_id required');
            }

            let user:User = req.locals._User;

            let username = user.username;

            let showData = {
                username,
                show_id
            };

            let result = await showCollection.insertOne(showData);


            return res.json(result);



        })





    }



    async addSeenToShow(user:User,show:{
        _id
        show : {
            _embedded: {
                nextepisode, previousepisode
            }
        }

    }) {

        let c = this.episode_watch_by_user;

        //find number of watches by episode id.




        console.log(`addSeenToShow`,show);
        if (! show || !show.show || !show.show._embedded)
        {
            return;
        }
        let {nextepisode,previousepisode} = show.show._embedded;


        //lookup number of watches for a user.
        for (let e of [nextepisode,previousepisode])
        {
            if (!e)
            {
                continue;
            }
            console.log(e);
            let episodeWatch = await
            c.findOne({
                episode_id: e.id,
                username: user.username
            });
            console.log(episodeWatch);

            if (!episodeWatch)
            {
                console.log(`insert new episode_watch`);

                c.insertOne({
                    episode_id: e.id,
                    username: user.username,
                    seen_count: 0
                });
                e.seen_count = 0;
            }
            else {
                e.seen_count = episodeWatch.seen_count;
            }

        }


    }

    async addSeenToShows(user,shows:Array<{
        _id
        show : {
            _embedded: {
                nextepisode, previousepisode
            }
        }

    }>) {

        for (let show of shows) {
            await this.addSeenToShow(user,show);

        }
    }


}



