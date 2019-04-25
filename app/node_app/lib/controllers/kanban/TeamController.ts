const ObjectID = require('mongodb').ObjectID;


export default class TeamController
{

    teamCollection;

    constructor(router,db)
    {
        this.teamCollection = db.collection('team');

        console.log(`init team controller`);

        router.get('/',(req,res) => {
            res.send(`hello from team controller
            /ping GET
            /list GET
            /list?filters=... GET
            /list/:id GET
            /post POST
            /post/:id POST
            `);
        });

        router.get('/ping',(req,res) => {
            res.json({
                ping: 'pong'
            })
        });


        //https://docs.mongodb.com/manual/reference/method/db.collection.find/
        //https://www.mathworks.com/help/database/ug/mongo.distinct.html
        //we will assume that members of the team can know about each other.
        router.get('/list', async (req, res) => {
            let user = req.locals._user;

            console.log(`get teams`);
            //always enforce membership
            let result = await this.teamCollection.find({
                member_list: user.username,
                is_deleted: 0

            }).toArray();
            console.log(`teams`,result);
            // let {docs} = result;
            res.json(result);
        });



        //if id given in the body update that team.

        //https://www.quora.com/How-can-you-design-a-many-to-many-relationship-schema-in-MongoDB

        //for now keep a list of usernames as members of the team.
        router.post('/post', async (req, res) => {
            let user = req.locals._user;
            let body = req.body;
            let {_id,name,is_deleted} = body;
            if (is_deleted === undefined)
            {
                is_deleted = 0;
            }
            if (!name)
            {
                return res.status(400).json({
                    errors: [
                        {
                            "name": "required"

                        }
                    ],
                    "valid": "false",
                })
            }

            console.log(`post body`,body);
            let team = {
                name,
                is_deleted,
                // id,
                //automatically add them as team organizer for a new team.
                created_by: user.username
                // note: req.body, //object containing the note
            };
            if (_id)
            {
                //{_id: ObjectId('5cb252bedc4b383af0c22260')}
                let objectId = ObjectID(_id);
                console.log(`search and update`);
                //verify user is on team before update.
                let filter = {
                    _id: objectId,
                    member_list: user.username,
                    is_deleted: 0
                };
                let result = await this.teamCollection.find(filter).toArray();
                if (result.length === 1)
                {
                    let updateResult = await this.teamCollection.update({
                            _id: objectId
                    },
                        {
                            $set: team //set updated team data.
                        }
                        );

                    // await insertMany(`notes`,[note]);
                    return res.json({
                        'ok': 'ok',
                        data: {
                            _id,
                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: 'Failed to find',
                        filter
                    })
                }


            }
            else {
                //https://stackoverflow.com/questions/25467750/node-js-mongodb-update-over-objectid
                //https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp
                team['member_list'] = [
                  user.username
                ];
                let insertResult = await this.teamCollection.insert(team);

                let {
                    result,
                    ops,
                    insertedCount,
                    insertedIds
                } = insertResult;
                let _id = insertedIds[0];
                //lookup using id before returning?


                console.log(`result`,result,_id);
                // return collection.insertMany(data)

                // await insertMany(`notes`,[note]);
                return res.json({
                    'ok': 'ok',
                    data: {
                        _id,
                    }
                });
            }


        });
    }
}