console.log(`test express`);

let port = 8009;

const express = require('express');
let app = express();


export default class ExpressServer
{



    async init()
    {
        return new Promise((r) =>
        {
            app.get('/', (req,res) => {
                res.json({ok:1})
            });

            let server = app.listen(port, () => {
                console.log(`express listening to port ${port}`);
                r(server);
            });


        });
    }



}