import BaseUnitTests from "../BaseUnitTests";
import Email from "../../../utils/email/Email";
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

        // await Email.sendEmail({
        //     to: `russjohnson09@gmail.com`,
        //     // from: `russj@greatlakescode.us`,
        //     // from: `baylee.wilderman@ethereal.email`,
        //     from: `russj@greatlakescode.us`,
        //     subject: 'test',
        //     html: 'test<br/>'
        // });


        await EmailTransactional.send({
            to: `russjohnson09@gmail.com`,
            // from: `russj@greatlakescode.us`,
            // from: `baylee.wilderman@ethereal.email`,
            subject: 'test',
            html: 'test<br/>'
        });

    }



}



if (require.main === module) {
    EmailTests.runAsScript();
}