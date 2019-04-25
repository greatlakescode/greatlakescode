import BaseMongoDBController from "../BaseMongoDBController";
import BaseController from "../BaseController";

const bcrypt = require('bcrypt');

export default class BasicAuthController
    extends BaseController
{


    async init()
    {
        return this.initRoutes();
    }


    // async getSettingsByUsername(db,username)
    // {
    //     let settings = {}
    // }



    async initRoutes()
    {

        //allow basic auth against the auth.users collection.


        let router = this.router;
        let db = await this.db;

        let userCollection = db.collection('user');



        router.use('', (req, res, next) => {
            req.locals = req.locals || {};
            next();
        });


        router.use('/logout', async (req,res,next) => {

            console.log(`headers`,req.headers);
            console.log(`authorization`,req.headers['authorization']);
            let authorizationHeader = req.headers['authorization'];
            let data = '';
            if (!authorizationHeader)
            {
                res.json({
                    status: 'logged out'
                });
            }
            if (authorizationHeader.indexOf('Basic ') === 0)
            {
                data = authorizationHeader.substring(6);
            }

            let buff = new Buffer(data, 'base64');
            let text = buff.toString('ascii');
            let user = text.split(':');

            if (user.length === 2)
            {
                let username = user[0];
                let users = await userCollection.find({
                    username
                }).toArray();

                if (users.length === 1)
                {
                    let updateResult = await userCollection.update({
                            _id: users[0]._id,
                            username: username
                        },
                        {
                            $set: {
                                basic_auth_expired: 1,
                            } //set updated team data.
                        }
                    )
                }
            }

            if (req.query.redirect)
            {
                return res.redirect(req.query.redirect);
            }

            return res.json({
                status: 'logged out'
            });
        });

        function getBasicAuthEncoded(username,password)
        {
            let text = `${username}:${password}`;
            let buff = new Buffer(text, 'ascii');
            text = buff.toString('base64');
            console.log(`getBasicAuthEncoded`,text);
            return 'Basic ' + text;

        }

        async function authLogin(req,res,next)
        {
            if (req.locals._user) //already set by another authenticator
            {
                return next();
            }
            console.log(`headers`, req.headers);
            console.log(`authorization`, req.headers['authorization']);
            let authorizationHeader = req.headers['authorization'];
            let data = '';
            if (!authorizationHeader) {
                res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
                // If the user cancels the dialog, or enters the password wrong too many times,
                // show the Access Restricted error message.
                return res.status(401).send("Authorization Required");
            }
            if (authorizationHeader.indexOf('Basic ') === 0) {
                data = authorizationHeader.substring(6);
            }

            let buff = new Buffer(data, 'base64');
            let text = buff.toString('ascii');
            let user = text.split(':');
            let username = user[0];
            let password = user[1];

            let filter = {
                username
            };
            let users = await userCollection.find(filter).toArray();

            console.log(`users`,filter,
                users,
                // db
                // ,userCollection
            );


            if (users.length === 1)
            {
                let userRecord = users[0];
                if (userRecord.basic_auth_expired == 1)
                {
                    let updateResult = await userCollection.update({
                            _id: users[0]._id,
                            username: username
                        },
                        {
                            $set: {
                                basic_auth_expired: 0,
                            } //set updated team data.
                        }
                    );
                    res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
                    // If the user cancels the dialog, or enters the password wrong too many times,
                    // show the Access Restricted error message.
                    return res.status(401).send("Authorization Required");
                }
                else {
                    let passwordMatch = bcrypt.compareSync(password, userRecord.password);
                    let userMatch = users[0];

                    console.log(`passwordMatch`, passwordMatch);
                    if (passwordMatch) {
                        let updateResult = await userCollection.update({
                                _id: users[0]._id,
                                username: username
                            },
                            {
                                $set: {
                                    basic_auth_expired: 0,
                                } //set updated team data.
                            }
                        );
                        if (!userMatch.settings)
                        {
                            //set default settings
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

                        req.auth = {user: {_id: users[0]._id,username,
                            settings: users[0].settings}};
                        return next();
                    }
                }

            }
            else {

                console.error(`user ${username} not found`);
                res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
                // If the user cancels the dialog, or enters the password wrong too many times,
                // show the Access Restricted error message.
                return res.status(401).send("Authorization Required");
            }

            res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
            // If the user cancels the dialog, or enters the password wrong too many times,
            // show the Access Restricted error message.
            return res.status(401).send("Authorization Required");

            // return res.status(401).json({
            //     "message": "failed"
            // })
        }

        router.get('/basic-auth/login', authLogin);

        //
        router.use('*', authLogin);


        router.use('',(req,res,next) => {
            if (req.locals._user) //already set by another authenticator
            {
                return next();
            }
            req.locals._user = req.auth ? req.auth.user : null;

            next();
        });



        router.get(`/`,(req,res) => {
            res.send(`
        /login POST process login
/login GET process login
/logout GET do logout
        `)
        });




        //can use req.auth for other user / password info?
        router.get('/me', (req, res) => {
            let user = req.locals._user;
            res.json(user);
        });


        //redirect to me or frontend
        //optionally redirect param
        router.get('/login',(req,res) => {
            res.send(`ok`);
            // res.redirect('/'); //redirect to frontend
        });


    }
}