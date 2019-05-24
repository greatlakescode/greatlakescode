import BaseUnitTests from "../BaseUnitTests";
import Password from "../../../utils/crypto/Password";
const expect = require('chai').expect;

export default class PasswordTests
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


        let hash = await Password.hash(`123`);

        console.log(`password hash`,hash);


        expect(await Password.compare(`123`,hash)).to.be.true;
        expect(await Password.compare(`1234`,hash)).to.be.false;

        // expect(Password.compare(`1234`,hash)).to.be.true;


    }



}



if (require.main === module) {
    PasswordTests.runAsScript(true);
}