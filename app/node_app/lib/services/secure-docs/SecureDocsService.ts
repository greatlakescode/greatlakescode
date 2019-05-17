import SteamRequest from "../../utils/steam/SteamRequest";
import BaseService from "../BaseService";
import User from "../../data/User";
import MongoDBHelper from "../../utils/MongoDBHelper";
import JsonWriter from "../../utils/file/json/JsonWriter";



//expires every 10 seconds
const DEFAULT_APP_LIST_UPDATE_EXPIRES = 10 * 1000;

//every hour default
const DEFAULT_APP_DETAILS_UPDATE_EXPIRES = 60 * (60 * 1000);

export default class SecureDocsService
    extends BaseService

{

    static appliedMigrations = false;

    steamRequest;

    db;

    secureDocsCollection;

    filepath;

    // username === email
    constructor(opts:{
        db // mongo db connection
        steam_api_key?,
        app_list_update_expires?, //ms to expire updated apps
        app_details_update_expires?,
    })
    {
        super(opts);

        this.db = opts.db;

        //notify any attempted downloads
        //limited sharing of sensitive docs with 2 auth email/phone
        this.secureDocsCollection = this.db.collection(`secure_docs`);

        this.filepath = process.env._GREATLAKESCODE_FILE_PATH;


    }


    async init()
    {
        await this.applyMigrations();

    }

    /**
     * Initialize by adding one secure doc for user russjohnson09@gmail.com
     * and allowing russjohnson09@gmail.com to access.
     */
    async applyMigrations()
    {
        // await this.addRequiredIndexes();

        await this.addTestSecureDoc();
    }





    async addTestSecureDoc()
    {
        console.log(`addTestSecureDoc`);
        let testFileName = `test.json`;
        let file = await JsonWriter.createPermanentWriter(testFileName);
        if (file.new_file)
        {
            file.writeData({test:1})
        }

        let docs = this.secureDocsCollection;
        await docs.insertOne({
            id: MongoDBHelper.getId(),
            name: 'last_app_list_update',
            username: `russjohnson09@gmail.com`,
            //TODO set limit or expiration...
            allowed_access: [
                {
                    type: 'email_verify',
                    email: 'russjohnson09@gmail.com',
                    expires: '0' //never expires
                }
            ],
        });
    }



}