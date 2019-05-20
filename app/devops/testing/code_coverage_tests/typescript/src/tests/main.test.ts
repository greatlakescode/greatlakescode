import TestMain from "./TestMain";




describe('test', () => {

    it('test1', async () => {
        let test = await TestMain.create();

        await test.runTests();
    });
});