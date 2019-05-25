const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request');

export default class RequestHelper {

    constructor()
    {

    }


    baseUrl = `http://localhost:3000`;


    async get(opts:{
        url, //either relative or exact
        headers?,
        qs?
    }):Promise<{
        body
    }>
    {

        let {url,headers,qs} = opts;



        return this.request({
            url,
            headers,
            qs,
            method: 'GET'
        });

    }


    async request(opts:{
        method,
        url,
        headers,
        qs
    }):Promise<{
        body
    }>
    {

        let {url,headers,qs,method} = opts;


        if (url.indexOf('://') === -1)
        {
            url = this.baseUrl + url;
        }

        let requestOpts = {
            method,
            url,
            headers,
            qs
        };

        //TODO log request/ response times
        let result:any = await (async function() {
            return new Promise((r) => {
                // let result:any = {};
                request(requestOpts, (err,response,body) => {
                    let result:any = {
                        statusCode: response.statusCode,
                        headers: response.headers,
                        err,
                        // response,
                        body
                    };
                    r(result);
                })

            });
        })();

        return result;

    }

}

