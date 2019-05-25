import BaseService from "../BaseService";
import MongoDBHelper from "../../utils/MongoDBHelper";



export default class UserDocsService
    extends BaseService

{


    db;

    userDocsCollection;

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
        this.userDocsCollection = this.db.collection(`user_docs`);

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
    }


    async getUserDocs(username)
    {
        let result = await this.userDocsCollection.find({
            username
        }).toArray();
        return result;
    }

    async getUserDoc(username,id)
    {
        let result = this.userDocsCollection.findOne({
            username,
            id
        });
        return result; //n, ok
    }


    async deleteUserDoc(username,id)
    {
        let result = this.userDocsCollection.deleteOne({
            username,
            id
        });
        return result.result; //n, ok
    }


    async addDoc(doc:{
        id?,
        file_absolute_path,
        filename,
        username,
        // shared_email,
        // password,
        // shared_token,
        // username,
        // allowed_access:Array<
        //     {
        //         type,email?,expires?
        //     }>
    })
    {
        if (!doc.id)
        {
            doc.id = MongoDBHelper.getId();
        }

        let docs = this.userDocsCollection;

        await docs.insertOne(doc);

        return doc;

    }


}