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

    static CODE_VERIFICATION_SENT = `CODE_VERIFICATION_SENT`;

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

    //Signed jwt that expires in x minutes.
    async sendEmailVerificationCode(emailAddress,docId)
    {
        //set verification code with 15 minute expiration.

        console.log(`sendEmailVerificationCode ${emailAddress}`);

    }


    /**
     * Check that the doc exists, the email is in the list of allowed_access.
     * @param id
     * @param emailAddress
     */
    async doVerifyEmailRequest(id,emailAddress,code?)
    {
        let docs = this.secureDocsCollection;

        let result = await docs.findOne(
            {
                id,
            allowed_access:{$elemMatch:{"type":"email_verify"
                    ,email:emailAddress}}}
        );

        if (!result)
        {
            let error = `Failed to get doc.`;
            console.log(`failed to get doc`);
            return {
                status: `FAILED`,
                error: error,
                message: error
            };
        }
        console.log(`got doc `,result);

        if (!code)
        {
            await this.sendEmailVerificationCode(emailAddress,id);
            return {
                status: SecureDocsService.CODE_VERIFICATION_SENT,
                error: null,
                message: `Sent Code verification.`
            };

        }
        else {

        }



    }

    /**
     * Initialize by adding one secure doc for user russjohnson09@gmail.com
     * and allowing russjohnson09@gmail.com to access.
     */
    async applyMigrations()
    {
        // await this.addRequiredIndexes();

        // let id = await this.addTestSecureDoc();

        // await this.testRequest(id,`russjohnson09@gmail.com`);
    }


    async testRequest(docId,email)
    {
        console.log(`send test request`);
        await this.doVerifyEmailRequest(docId,email);

    }



    async addDoc(doc:{
        id?,
        file_absolute_path,
        filename,
        user_email,
        shared_email,
        password,
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

        let docs = this.secureDocsCollection;

        await docs.insertOne(doc);

        return doc;

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
        let id = MongoDBHelper.getId();
        await docs.insertOne({
            id,
            filename: testFileName,
            file_absolute_path: file.filename,
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

        return id;
    }



}