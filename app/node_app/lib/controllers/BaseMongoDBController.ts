const MongoClient = require('mongodb').MongoClient;

export default class BaseMongoDBController {
    protected async clientConnection(opts?: { url?, dbName? }):Promise<any> {
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

    protected dbName;
    protected mongoDbUrl;

    protected defaultDBName = '';



    constructor(protected opts: {
        router,
        dbName?,
        mongoDbUrl?
    }) {

        this.dbName = opts.dbName || this.defaultDBName;
        this.mongoDbUrl = opts.mongoDbUrl || 'mongodb://localhost:27017';

        // console.log(`constructed`,this.constructor.name,this.defaultDBName, this.dbName,this.mongoDbUrl)


    }


    get router() {
        return this.opts.router;
    }


    protected async getDB()
    {
        return this.clientConnection();
    }

}

