process.env.GREATLAKESCODE_PORT = '3001';


(function() {
    console.log(`setup.test.ts`);


    describe('setup', function() {
        this.timeout(10 * 1000)
        it('setup sever', async function() {
            // this.timeout(10 * 1000)

            console.log(`setup.test.ts setup sever`);

            const path = require('path');
            const fs = require("fs");
            console.log(__dirname);

            // console.log(process.env);
            //travis-ci will load these in separately.
            require('dotenv').config({path:path.resolve(__dirname,'..','..','.env')});

            let result = await require('./../../dist/init')();

            await require('./../../dist/start_app')({
            });


        })
    });

})();

