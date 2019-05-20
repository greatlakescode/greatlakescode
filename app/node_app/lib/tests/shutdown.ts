import App from "../App";

process.env.GREATLAKESCODE_PORT = '3001';


(function() {

    describe('shutdown server', function() {
        this.timeout(10 * 1000)
        it('shutdown server', async function() {
            // this.timeout(10 * 1000)

            await App.staticShutdown();


        })
    });

})();

