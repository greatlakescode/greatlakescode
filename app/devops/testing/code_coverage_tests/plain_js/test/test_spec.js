let index = require('./../index.js');


describe('test', () => {
    it('test', (done) => {

        done();

    })
});


describe('testFunction1', () => {
    it('test', (done) => {

        index.testFunction1();

        done();

    })
});


describe('testFunction2', () => {
    it('test', (done) => {

        index.testFunction2(false);

        done();

    });
});


describe('testFunction2', () => {
    it('test', (done) => {

        index.testFunction2(true);

        done();

    });
});



describe('init-express', () => {
    it('init-expres', async () => {

        await index.initExpress();

    })
});