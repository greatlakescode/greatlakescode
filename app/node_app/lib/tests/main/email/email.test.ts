import EmailTests from "../../unit/email/EmailTests";
const expect = require('chai').expect;

describe('email', function() {
    this.timeout(60 * 1000);
    it('email', async function() {

        let result = await EmailTests.runAsScript();

        expect(result).to.be.true;

    })
});
