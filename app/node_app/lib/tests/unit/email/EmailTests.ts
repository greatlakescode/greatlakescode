import BaseUnitTests from "../BaseUnitTests";

export default class EmailTests
    extends BaseUnitTests
{

    db;



    async init()
    {
        await super.init();
    }


    async run()
    {
        console.log(`running tests`,this.constructor.name);

    }



}



if (require.main === module) {
    EmailTests.runAsScript();
}