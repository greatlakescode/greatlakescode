console.log(`test express`);

let port = 8009;

const express = require('express');
let app = express();


module.exports = function()
{
    return new Promise((r) =>
    {
        app.get('/', (req,res) => {
            res.json({ok:1})
        });

        app.listen(port, () => {
            console.log(`express listening to port ${port}`);
            r();
        });


    });
};