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

    //https://www.npmjs.com/package/request
    async postFormData(opts:{
        url, //either relative or exact
        formData?
        headers?,
        // qs?
    })
    {
        let {url,headers,formData} = opts;

        return this.request({
            method: 'POST',
            url,
            headers,
            formData
        });

    }

    //https://www.npmjs.com/package/request
    async request(opts:{
        method,
        url,
        headers,
        qs?,
        formData?
    }):Promise<{
        body
    }>
    {

        let {url,headers,qs,method,formData} = opts;


        if (url.indexOf('://') === -1)
        {
            url = this.baseUrl + url;
        }

        let requestOpts = {
            method,
            url,
            headers,
            qs,
            formData
        };

        //TODO log request/ response times
        let result:any = await (async function() {
            return new Promise((r,reject) => {
                try {
                    request(requestOpts, (err,response,body) => {
                        response = response || {};
                        let result:any = {
                            statusCode: response.statusCode,
                            headers: response.headers,
                            err,
                            // response,
                            body
                        };
                        r(result);
                    });
                }
                catch (e)
                {
                    reject(e);
                }


            });
        })();

        return result;

    }

}

