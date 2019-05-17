const moment = require('moment');
const argv = require('optimist').argv;

if (require.main === module) {
    require('./../../../start_api_module')(async function () {
        try {

            let {db} = await require('./../init_script')();
            let test = await PinTests.create({
                db
            });

            await test.runTests();

            setTimeout(() => {
                process.exit(0)
            },1000);

        } catch (e) {

            console.error(e.message,e);
            setTimeout(() => {
                process.exit(1)
            },1000);

        }
    },{
        MOC_OPERATIONAL_DB_SYNCRONIZE: '0',
        IS_CLI: '1',
    });
    // (async function() {
    //
    //
    // })();
}


export default class PinTests
{


    constructor(opts?)
    {

    }

    static async create(opts?)
    {
        let self = this;
        let obj = new self(opts);

        return obj;
    }

    async runTests()
    {
        console.log(`${this.constructor.name}`);


    }

}