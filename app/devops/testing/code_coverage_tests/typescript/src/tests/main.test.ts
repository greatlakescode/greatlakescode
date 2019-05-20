import TestMain from "./TestMain";

let expect = require('chai').expect;




describe('test', () => {

    it('test1', async () => {
        let test = await TestMain.create();

        await test.runTests();
    });
});