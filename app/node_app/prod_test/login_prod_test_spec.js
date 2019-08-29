let baseProdUrl = `https://api.greatlakescode.us`;



let login = `${baseProdUrl}`;



const request = require('request');

describe(`do login`, function() {
    it('/login POST', function(done) {
        let body = {
            username: `guest`,
            password: `guest`
        };

        let options = {
            method: 'POST',
            url: baseProdUrl + '/login',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(body)
        };


        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            let json = JSON.parse(body);

            console.log(`response `,body);

            done();
        });
    });
});
