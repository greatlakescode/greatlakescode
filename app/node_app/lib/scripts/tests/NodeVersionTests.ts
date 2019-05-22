import CmdHelper from "../../utils/system/CmdHelper";

const moment = require('moment');
const argv = require('optimist').argv;



export default class NodeVersionTests
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
        let {error,stdout,stderr} = await CmdHelper.getNodeVersion();

        console.log(stdout);


    }

}



if (require.main === module) {
    (async function () {
        try {

            let test = await NodeVersionTests.create({
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
    })();
}