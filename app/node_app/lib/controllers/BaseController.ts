const MongoClient = require('mongodb').MongoClient;

export default class BaseController {
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


    //read only await init.
    get router()
    {
        return this.opts.router;
    }

    get db()
    {
        return this.opts.db;
    }


    constructor(protected opts: {
        router,
        db
    }) {
    }


    static async initController(opts:{
        db,
        router
    })
    {
        let self = this;

        let obj = new self(opts);
        await obj.init();

        return obj;
    }



    async init() {
        await this.initServices();
        // let db = await this.getDB();
        // let pingCollection = db.collection('ping');
        // pingCollection.insertOne({now:Date.now(),message:'init ' + this.constructor.name});
        await this.initRoutes();
    }

    /**
     * Initialize any services used by the controller.
     * Initialize any collections or other connections required.
     */
    async initServices()
    {

    }
    async initRoutes()
    {

    }

}

