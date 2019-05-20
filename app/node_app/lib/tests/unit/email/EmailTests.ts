import BaseUnitTests from "../BaseUnitTests";
import Email from "../../../utils/email/Email";

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

        await Email.sendEmail({
            to: `russjohnson09@gmail.com`,
            from: `russj@detroitsoftware.com`,
            subject: 'test',
            html: 'test<br/>'
        })

    }



}



if (require.main === module) {
    EmailTests.runAsScript();
}