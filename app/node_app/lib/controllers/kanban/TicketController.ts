const ObjectID = require('mongodb').ObjectID;


/**
 * Assign tickets to individuals and optionally to teams.
 *
 * Assign points or hours or whatever to the ticket.
 *
 * When moving a ticket get a history of this ticket for
 * reporting latter based on person or team.
 *
 */
export default class TicketController
{

    collection;

    constructor(router,db)
    {
        this.collection = db.collection('ticket');

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

            //always enforce membership
            let result = await this.collection.find({
                assigned_to: user.username,
                status: {$in: ['todo','in_progress']},
                is_deleted: 0

            }).toArray();
            // let {docs} = result;
            res.json(result);
        });



        //if id given in the body update that team.

        //https://www.quora.com/How-can-you-design-a-many-to-many-relationship-schema-in-MongoDB

        //for now keep a list of usernames as members of the team.
        router.post('/post', async (req, res) => {
            let user = req.locals._user;
            let body = req.body;
            let {_id,name,is_deleted,status,description} = body;
            if (is_deleted === undefined)
            {
                is_deleted = 0;
            }
            if (!name && !_id)
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
            let record = {
                description,
                name,
                is_deleted,
                status: status || 'todo',
                //object id.
                assigned_team_id: null, //team members on this team will be able to see this.
                // id,
                //automatically add them as team organizer for a new team.
                created_by: user.username, //owner of this ticket.
                assigned_to: user.username, //you can see it by default when assigned to you.
                // note: req.body, //object containing the note
            };
            if (_id)
            {
                for (let key in record)
                {
                    if (record[key] === undefined)
                    {
                        delete record[key];
                    }
                }
                //{_id: ObjectId('5cb252bedc4b383af0c22260')}
                let objectId = ObjectID(_id);
                console.log(`search and update`);
                //verify user is on team before update.
                let filter = {
                    _id: objectId,
                    // member_list: user.username,
                    is_deleted: 0
                };
                let result = await this.collection.find(filter).toArray();
                if (result.length === 1)
                {
                    let updateResult = await this.collection.update({
                            _id: objectId
                    },
                        {
                            $set: record //set updated team data.
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
                let insertResult = await this.collection.insert(record);

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