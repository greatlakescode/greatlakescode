// const basicAuth = require('express-basic-auth');
import BaseController from "../BaseController";
import LoggingService from "../../services/logging/LoggingService";

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');


export default class EmailBasedAuthController
    extends BaseController
{


    jwt_secret;
    logService;

    get router()
    {
        return this.opts.router;
    }


    //npm i --save-dev  @types/es6-promise
    //https://stackoverflow.com/questions/43119163/typescript-error-ts2693-promise-only-refers-to-a-type-but-is-being-used-as
    constructor(protected opts: {
        router,
        db
        JWT_SECRET?,
    }) {

        super(opts);


        this.logService = new LoggingService({
            db: this.db
        });

        //https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
        this.jwt_secret = this.opts.JWT_SECRET || process.env.GREATLAKESCODE_EMAIL_BASED_AUTH_JWT_SECRET;
        if (!this.jwt_secret) {
            console.log(`process.env.GREATLAKESCODE_EMAIL_BASED_AUTH_JWT_SECRET must be set to a secure secret`);
            process.exit(1);
        }
    }


    async init() {
        console.log(`EmailBasedAuthController->init`);
        const path = require('path');
        const bcrypt = require('bcrypt');

//https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
        let jwt_secret = this.jwt_secret;

        console.log(`jwt_secret`,jwt_secret);



        let opts = this.opts;


        let db = this.db;
        let router = this.router;
        let userCollection = db.collection('user');

        router.use('', (req, res, next) => {
            req.locals = req.locals || {};
            next();
        });

        let multer  = require('multer');
        let upload = multer();

        //check mongodb for user
        router.post(`/login`,
            upload.none(),
            async (req, res) => {

            console.log(`EmailBasedAuthController /login POST`);

            //TODO ip for all in req.locals like with user info...
            let ip;

            let {username, password} = req.body;

            await this.logService.doLog({
                message: `Login attempt by user ${username} at ip ${ip}`
            });

            if (!username || !password)
            {
                return res.status(400).json({
                    error: `username and password must be given`
                });
            }

            let users = await userCollection.find({
                username
            }).toArray();

            console.log(`found users`, users);

            if (users.length < 1) {
                console.log(`create user`);
                let hash = bcrypt.hashSync(password, 10);
                userCollection.insert({
                    user_type: 'basic',
                    username,
                    password: hash,
                    settings: {
                        city: '',
                        state: '',
                        address1: '',
                        address2: '',
                        phone: '',
                        zip: '',

                    },
                });
            } else {
                let user = users[0];
                // let {password} = user;
                let passwordMatch = bcrypt.compareSync(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({
                        "message": "failed"
                    })
                }
                else {
                    if (!user.settings)
                    {
                        let updateResult = await userCollection.update({
                                _id: users[0]._id,
                                username: username
                            },
                            {
                                $set: {
                                    settings: {
                                        city: '',
                                        state: '',
                                        address1: '',
                                        address2: '',
                                        phone: '',
                                        zip: '',

                                    },
                                } //set updated team data.
                            }
                        );
                    }

                }
            }

            let user = await userCollection.findOne({
                username
            });

            let token = jwt.sign({
                user: {
                    username: user.username,
                    settings: user.settings,
                }
            }, jwt_secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // console.log(username,password);
            res.json({
                set_headers: {
                    'x_token': token
                }
            })

        });


        //token should only be used to verify username.
        //if X-Token in the headers decrypt and check that user exists.
        router.use("*", async (req, res, next) => {
            let token = req.headers['x-token'];
            console.log(`token`, token);

            if (token) {
                try {
                    let result = jwt.verify(token, jwt_secret);
                    // let {user} = result.user;

                    // let foundUser =
                        let user = await userCollection.findOne({
                        username: result.user.username
                    });

                    console.log(`token result`, result);
                    req.locals._user = {
                        username: user.username,
                        settings: user.settings
                    }

                } catch (e) {

                }
            }
            next();

        });

        router.get('/ping.json', (req, res) => {
                res.json({
                    'ok': 'ok'
                });
            }
        );

        //can use req.auth for other user / password info?
        router.get('/me', (req, res) => {
            let user = req.locals._user;
            res.json(user);
        });


        return router;

    }

//returns db connection.
    async clientConnection(opts: { url, dbName }) {
        let url = opts.url;
        let dbName = opts.dbName;
        const client = new MongoClient(url);

        return new Promise((resolve) => {
            client.connect(function (err) {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                return resolve(db);
                // client.close();
            });
        })
    }


}



