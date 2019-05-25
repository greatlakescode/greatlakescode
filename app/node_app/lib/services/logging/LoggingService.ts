import BaseService from "../BaseService";
import MongoDBHelper from "../../utils/MongoDBHelper";

export default class LoggingService
    extends BaseService
{

    db;
    logCollection;


    constructor(opts:{
        db // mongo db connection
    })
    {
        super(opts);

        this.db = opts.db;

        //notify any attempted downloads
        //limited sharing of sensitive docs with 2 auth email/phone
        this.logCollection = this.db.collection(`log`);

    }

    async doLog(opts:{
        message
          })
    {
        let {
            message
        } = opts;

        await this.logCollection.insertOne({
            id: MongoDBHelper.getId(),
            created: new Date(),
            message
        })
    }
}