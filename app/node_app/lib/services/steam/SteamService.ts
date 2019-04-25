import SteamRequest from "../../utils/steam/SteamRequest";
import BaseService from "../BaseService";
import User from "../../data/User";



//expires every 10 seconds
const DEFAULT_APP_LIST_UPDATE_EXPIRES = 10 * 1000;

//every hour default
const DEFAULT_APP_DETAILS_UPDATE_EXPIRES = 60 * (60 * 1000);

export default class SteamService
    extends BaseService

{

    static appliedMigrations = false;

    steamRequest;

    db;
    steam_api_key;
    app_list_update_expires;
    app_details_update_expires;

    steamAppCollection;
    steamAppMetaCollection;
    steamAppWishlistCollection;

    constructor(opts:{
        db // mongo db connection
        steam_api_key?,
        app_list_update_expires?, //ms to expire updated apps
        app_details_update_expires?,
    })
    {
        super(opts);

        this.db = opts.db;
        this.steam_api_key = opts.steam_api_key || process.env.GREATLAKESCODE_STEAM_API_KEY;
        this.app_list_update_expires = opts.app_list_update_expires
            || process.env.GREATLAKESCODE_STEAM_APP_LIST_EXPIRES || DEFAULT_APP_LIST_UPDATE_EXPIRES;

        this.app_details_update_expires = opts.app_details_update_expires
            || process.env.GREATLAKESCODE_STEAM_APP_DETAILS_EXPIRES
            || DEFAULT_APP_DETAILS_UPDATE_EXPIRES;

        this.steamAppCollection = this.db.collection(`steam_app`);
        this.steamAppMetaCollection = this.db.collection(`steam_app_meta`);
        this.steamAppWishlistCollection = this.db.collection(`steam_app_wishlist`);
        // console.log(`process.env`,process.env);


        if (!this.steam_api_key)
        {
            console.log(`steam_api_key required`);
            throw new Error(`steam_api_key required`);
        }


    }


    async init()
    {
        this.steamRequest = new SteamRequest({
            steam_api_key: this.steam_api_key
        });

        await this.applyMigrations();

    }

    async applyMigrations()
    {
        await this.addRequiredIndexes();
    }

    async doUpdate()
    {
        let collection = this.steamAppMetaCollection;
        let self = this;
        let expires = await this.getLastAppListUpdatExpires();

        //does it make sense to have this if statement for a condition
        //that only happens once in the app's lifetime.
        //TODO add a migration step to initialize app so this if statement is unnecessary?
        if (!expires)
        {
            let now = Date.now();
            //insert into list update.
            //do update
            console.log(`doUpdate ${new Date()}`);
            await collection.insertOne({
                name: 'last_app_list_update',
                update: now,
                expires: now + self.app_list_update_expires
            });

            await this.populateAppList();
        }
        else {

            let now = Date.now();
            if (now > expires)
            {
                console.log(`update app list`);
                await collection.updateOne({
                    name: 'last_app_list_update',

                },{
                    $set: {
                        update: now,
                        expires: now + self.app_list_update_expires
                    }
                    // name: 'last_app_list_update',

                });
                await this.populateAppList();

            }

        }

    }


    //TODO search for removed?
    //{ appid: 410210, name: 'Ampersand' }
    async populateAppList()
    {
        let c = this.steamAppCollection;

        let now = Date.now();
        let created = now;
        let updated = now;

        let result = await this.steamRequest.getAppList();

        let currentList = await c.find().toArray();

        let steamAppsById = {};
        let currentListById = {};
        //upsert for each.
        for (let app of result)
        {
            steamAppsById[app.appid] = app;
        }

        for (let currentApp of currentList)
        {
            let {appid,name} = currentApp;
            currentListById[appid] = currentApp;
            if (!steamAppsById[appid])
            {
                //TODO archive instead?
                console.log(`deleting old app ${appid} ${name}`);
                await c.deleteOne({
                    appid: appid
                })
            }
            else {
                //potential name change
                if (steamAppsById[appid].name !== name)
                {
                    //https://store.steampowered.com/app/590218
//updating old app 590218 Rocksmith® 2014 Edition �� Remastered – Grateful Dead - “Casey Jones”
                    //may be a problem with the steam api npm package I am using?
                    //http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json

                    //this looks like a bug on steams end or the npm steam api. sometimes the name comes back with ?? but
                    //not always.
                    console.log(`updating old app ${appid} ${name}

${steamAppsById[appid].name}`);
                    await c.updateOne({
                        appid: appid
                    }, {
                        $set: {
                            name: steamAppsById[appid].name,
                            updated: now,
                        }
                    })
                }

                //no longer required for insert/update if found
                delete steamAppsById[appid];
            }
        }

        for (let newAppId in steamAppsById)
        {
            let newApp = steamAppsById[newAppId];
            let {appid,name} = newApp;
            console.log(`inserting new app ${appid} ${name}`);


            //TODO also need to know pricing update.
            await c.insertOne({
                appid,
                name,
                created,
                updated,
            });


        }




        //index by appid
        // console.log(`populateAppList`,result,currentList);


    }


    async getLastAppListUpdatExpires()
    {
        let result = await this.steamAppMetaCollection.findOne({
            name: 'last_app_list_update'
        });

        if (!result)
        {
            return null;
        }
        else {
            return result.expires; //timestamp
        }
    }



    //https://mongodb.github.io/node-mongodb-native/markdown-docs/indexes.html
    //TODO handle these indexes in the model?
    //https://stackoverflow.com/questions/13395041/nodejs-mongo-native-check-if-collection-exists-before-query
    //ERROR trying to create index on collection that does not exist.
    async addRequiredIndexes()
    {

        let db = this.db;
        await db.createCollection("steam_app");

        let metaCollection = this.steamAppMetaCollection;
        let steamAppCollection = this.steamAppCollection;
        let indexes = await steamAppCollection.indexInformation();
        // let indexes = await db.collection.getIndexes();


        console.log(`addRequiredIndexes`,indexes);
        let result = await steamAppCollection.ensureIndex( { name: "text",
            // description: "text"
        } );
        console.log(`addRequiredIndexes`,result);
        indexes = await steamAppCollection.indexInformation();
        console.log(`addRequiredIndexes`,indexes);

        // steamAppCollection.createIndex( { name: "text",
        //     // description: "text"
        // } )

        // let migration1 = metaCollection.findOne({
        //     name: `migration_add_text_index1`
        // });
        //
        // //find indexes if they do not exist create them.
        // if (!migration1)
        // {
        //     //apply migration and insert
        //     db.stores.createIndex( { name: "text", description: "text" } )
        // }
    }


    async updateGameDetails(app)
    {
        let steamApp = this.steamAppCollection;
        let now = Date.now();
        let force = true;

    //     updateAppPricing Video Test Patterns: No Encryption Test 807250
    // (node:13528) UnhandledPromiseRejectionWarning: Error: No app found


        console.log(`updateGameDetails`,app.name,app.appid);

        let gameDetails;
        try {
            gameDetails = await this.steamRequest.getGameDetails(app.appid,force);

        }
        catch (e)
        {
            console.error(`failed to update game details for app`,app,e.message);
            return;
        }

        let expires = now + this.app_details_update_expires;
        let updated = now;
        let original_final_price = app.final_price;


        // console.log(`got game details`,details);

        // got game details { type: 'dlc',
        // name: 'Forgotton Anne Collectors Upgrade',
        // steam_appid: 630420,
        // required_age: 0,
        // is_free: false,
        // controller_support: 'full',
        // detailed_description html
        // about_the_game html
        // short_description html
        //fullgame: {appid, name}
        //supported_languages
        //developers
        //publishers
        //packages
        //categories [{id,description}] array of categories with id and description
        //genres array of genres
        //screenshots array of screenshots
        //movies array of movies
        //support_info
        //background

        console.log(`got game price_overview ${gameDetails['is_free']}`,
            gameDetails['price_overview']);

        //inital
        //final


        //details_update
        //details_expires
        //discount_percent
        //inital_price
        //final_price
        //discount_percent
        //short_description

        // { currency: 'USD',
        //     initial: 1999,
        //     final: 1999,
        //     discount_percent: 0,
        //     initial_formatted: '',
        //     final_formatted: '$19.99' }

        //short_description


        let {
            currency,
            header_image,
            price_overview,
            short_description,
            type,
            is_free} = gameDetails;

        let updateFields = {
            currency,
            header_image,
            short_description,
            type,
            is_free,
            details_expires: expires,
            details_updated: updated
        };



        //if final_price has changed do additional checks
        //store pricing history for an app.

        // let discount_percent,inital_price,final_price;
        if (price_overview)
        {
            let { currency, //: 'USD',
                    initial, //: 1999,
                    final, //: 1999,
                    discount_percent, //: 0,
                    initial_formatted, //: '',
                    final_formatted, //: '$19.99'
            } = price_overview;
            updateFields['discount_percent'] = discount_percent;
            updateFields['initial_price'] = initial;
            updateFields['final_price'] = final;
            // updateFileds['discount_percent'] = discount_percent;

        }

        if (original_final_price !== undefined &&
            original_final_price != updateFields['final_price'])
        {
            console.log(`pricing change`);

        }
        //check for any apps on wishlist where price <= price threshold.


        //price.
        // let gameDetailKeys = [
        //     'price_overview',
        //     'short_description',
        // ]

        // for (let [])



        await steamApp.updateOne({
                appid: app.appid
            },
            {
                $set: updateFields

            }
        );

        for (let key in updateFields)
        {
            app[key] = updateFields[key];
        }

    }


    //pricing_details
    //Get details for app id. Requests for this endpoint are limited to 200 every 5 minutes

    //keep historic pricing data.

    //price_overview

    //https://stackoverflow.com/questions/13784059/how-to-get-the-price-of-an-app-in-steam-webapi
    //https://store.steampowered.com/api/appdetails?appids=57690
    async checkUpdateGameDetails(app)
    {
        let now = Date.now();
        if (!app.details_expires || app.details_expires < now)
        {
            await this.updateGameDetails(app);
        }





        //steamAPI.getGameDetails(app, [force]) ⇒ Promise.<Object>

        // getGameDetails

    }


    /**
     * returns an array of steam apps.
     *
     * { appid: 410210, name: 'Ampersand' }
     *
     * https://docs.mongodb.com/manual/text-search/
     *
     *
     * TODO need to createIndex on new collections.
     * db.stores.createIndex( { name: "text", description: "text" } )
     *
     * db.stores.find( { $text: { $search: "java coffee shop" } } )

     */
    async getAppList(opts?:{
        filters? //https://docs.mongodb.com/manual/text-search/ mongodb filters
        skip?,
        limit?
                     })
    {
        opts = opts || {};
        let filters = opts.filters || {};
        let skip = opts.skip || 0;
        let limit = opts.limit || 0; //no limit by default.

        await this.doUpdate();


        let currentList = await this.steamAppCollection.find(
            filters
        ).skip(skip).limit(limit).toArray();

       return currentList;
    }

    /**
     * todo pagination
     *
     * https://www.codementor.io/arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
     *
     * I will use cursor skip and cursor.limit as the default.
     *
     * _id greater than may be more efficient but less flexible when sorting.
     *
     *
     * https://stackoverflow.com/questions/16902674/mongodb-text-search-and-multiple-search-words
     *
     * @param name
     */
    async searchAppsByName(name,skip = 0, limit = 10)
    {
    // * https://stackoverflow.com/questions/16902674/mongodb-text-search-and-multiple-search-words

        let searchString = name.split(" ").map(str => "\""+str+"\"").join(' ')
        let filters = {
            $text: {
                $search: searchString
            }
        };

        let appList = await this.getAppList({
            filters,
            skip,
            limit
        });


        for (let app of appList)
        {
            await this.checkUpdateGameDetails(app);
        }

        return appList;
    }


    async addAppToWishlist(wanted_price,appid,username)
    {
        let c = this.steamAppWishlistCollection;
        let data = {
            wanted_price,
            appid,
            username
        };


        let result = await c.insertOne(data);

        return result;
    }

    async getAppById(appid)
    {
        let c = this.steamAppCollection;

        let app = c.findOne({
            appid
        });

        await this.checkUpdateGameDetails(app);

        return app;

    }

    async getAppWishlist(username)
    {
        let c = this.steamAppWishlistCollection;

        let apps = await c.find({
            username
        }).toArray();

        for (let app of apps)
        {
            let fullApp = await this.getAppById(app.appid);
            console.log(`got fullapp`,fullApp);
            Object.assign(app,fullApp);
        }

        return apps;

    }



}