const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

export default class MongoDBHelper {




    public static mongoDbUrl = `mongodb://localhost:27017`;
    public static defaultDBName = `greatlakescode`;


    public static async getDB(opts?: { url?, dbName? }):Promise<any> {
        opts = opts || {};
        let url = opts.url || this.mongoDbUrl;
        let dbName = opts.dbName || this.defaultDBName;
        const client = new MongoClient(url);
        let self = this;

        return new Promise((resolve) => {
            client.connect(function (err) {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                console.log(`${self.constructor.name} fetching database ${dbName}`);
                return resolve(db);
                // client.close();
            });
        })
    }

    public static getObjectID(id)
    {
        return new ObjectID(id);
    }




}

