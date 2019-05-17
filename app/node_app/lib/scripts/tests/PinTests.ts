import PinGenerator from "../../utils/crypto/PinGenerator";

const moment = require('moment');
const argv = require('optimist').argv;

if (require.main === module) {
    (async function () {
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
    })();
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


        let pin_code = await PinGenerator.generatePin(4);

        console.log(`${this.constructor.name}`,pin_code);

        let pin_codes = [];

        for (let i = 0; i < 100; i++)
        {
            let pin_code = await PinGenerator.generatePin(5);

            pin_codes.push(pin_code);

        }


        console.log(pin_codes);



    }

}