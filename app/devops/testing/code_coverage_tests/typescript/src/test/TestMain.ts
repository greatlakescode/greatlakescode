require('source-map-support').install();
//https://istanbul.js.org/docs/tutorials/typescript/

//https://github.com/istanbuljs/nyc/issues/618

//https://github.com/Microsoft/TypeScript/issues/24993

export default class TestMain
{

    static async create()
    {
        let self = this;
        let obj = new self();
        await obj.init();
        return obj;
    }

    async init()
    {

    }


    async runTests()
    {
        console.log(`TestMain run tests`);

        throw new Error(`error source-map should give ts line`);
    }



}


if (require.main === module) {
    (async function () {
        try {
            console.log(`TestMain called as script`);
            let test = await TestMain.create();

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