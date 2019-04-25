import RequestHelper from "../RequestHelper";

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request');

export default class TVMazeRequest
extends RequestHelper
{

    baseUrl = `http://api.tvmaze.com`;

// http://api.tvmaze.com/search/shows?q=girls
    async searchShows(searchString) //returns an array of results
    {
        let {body} = await this.get({
            qs: {
                q: searchString
            },
            url: `/search/shows`
        });


        return JSON.parse(body);
    }

    // URL: /shows/:id

    // http://api.tvmaze.com/shows/1?embed=episodes
    // http://api.tvmaze.com/shows/1?embed[]=episodes&embed[]=cast
    async getShowMainInfo(show_id)
    {
        let {body} = await this.get({
            // qs: { 'embed[]': [ 'episodes', 'cast' ] },

            // qs: {
            //     "embed[]": [
            //         "episodes",
            //         // 'next_episode',
            //         'cast'
            //     ]
            // },
            //  "_embedded": {
            //episodes
            // url: `/shows/` + show_id + `?embed[]=episodes&embed[]=cast`
            url: `/shows/` + show_id + `?embed[]=nextepisode&embed[]=previousepisode`

        });

        console.log(body);

        let shows = JSON.parse(body);

        // console.log(show,show.show._embedded);

        // let {nextepisode,previousepisode} = show.show._embedded;

        return shows;
        //
        // if (nextepisode,previousepisode)
        // {
        //
        // }


    }

    async getShowsMainInfo(shows:Array<{
      show_id
    }>)
    {
        // let result = [];

        for (let show of shows)
        {
            let showInfo = await this.getShowMainInfo(show.show_id);

            console.log(`getShowsMainInfo`,show,showInfo);

            show['show'] = showInfo;
        }

        return shows;

    }

}
