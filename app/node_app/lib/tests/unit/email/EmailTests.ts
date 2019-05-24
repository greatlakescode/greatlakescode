import BaseUnitTests from "../BaseUnitTests";
import EmailTransactional from "../../../utils/email/EmailTransactional";

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


        await EmailTransactional.send({
            to: `russj@greatlakescode.us`,
            subject: 'test ' + new Date(),
            html: `test<br/> ${new Date()}`
        });

    }



}



if (require.main === module) {
    EmailTests.runAsScript(true);
}