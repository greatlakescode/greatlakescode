import EmailTests from "../../unit/email/EmailTests";

describe('email', function() {
    this.timeout(60 * 1000);
    it('email', async function() {

        await EmailTests.runAsScript();

    })
});
