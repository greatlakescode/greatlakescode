import RequestHelper from "../RequestHelper";

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request');


//https://store.steampowered.com/api/appdetails?appids=57690

//http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json

//https://stackoverflow.com/questions/46330864/steam-api-all-games

//https://partner.steamgames.com/doc/webapi/ISteamApps

export default class SteamRequest
extends RequestHelper
{

    steam_api_key;
    steam;

    constructor(opts:{
        steam_api_key
    })
    {
        super();
        this.steam_api_key = opts.steam_api_key;
        // let pingCollection = db.collection('ping');
        const SteamAPI = require('steamapi');
        const steam = new SteamAPI(this.steam_api_key);
        this.steam = steam;
    }


    //http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json

    async getAppList():Promise<Array<{
        appid,
        name
    }>>
    {
        let result = await this.steam.getAppList();

        return result;
    }


    //https://store.steampowered.com/api/appdetails?appids=57690
    async getGameDetails(appid,force?)
    {
        let result = await this.steam.getGameDetails(appid,force);

        return result;
    }

}
