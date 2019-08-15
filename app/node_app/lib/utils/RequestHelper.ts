const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const request = require('request');

export default class RequestHelper {


    logErrors = true;
    constructor()
    {

    }


    baseUrl = `http://localhost:3000`;
    defaultHeaders = {};

    setDefaultHeaders(defaultHeaders)
    {
        this.defaultHeaders = defaultHeaders;
    }


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

    async postJson(opts:{
        url,
        json,
        headers?,
        qs?
    }):Promise<{
        statusCode,
        headers,
        err,
        body
    }>
    {

        opts.headers = opts.headers || {};
        opts.headers['content-type'] = 'application/json';
        let {url,headers,json,qs} = opts;

        let body = JSON.stringify(json);

        let requestOpts = {
            method: 'POST',
            url,
            headers,
            body,
            qs,
        }
        return this.request(requestOpts);
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
        formData?,
        body?
    }):Promise<{
        statusCode,
        headers,
        err,
        body
    }>
    {
        let self = this;

        let {url,headers,qs,method,formData,body} = opts;

        headers = Object.assign({},this.defaultHeaders,headers);


        if (url.indexOf('://') === -1)
        {
            url = this.baseUrl + url;
        }

        let requestOpts = {
            method,
            url,
            headers,
            qs,
            formData,
            body
        };

        //TODO log request/ response times
        let result:any = await (async function() {
            return new Promise((r,reject) => {
                try {
                    request(requestOpts, (err,response,body) => {
                        response = response || {};
                        let result:any = {
                            meta: {
                                requestOpts,
                            },
                            statusCode: response.statusCode,
                            headers: response.headers,
                            err,
                            // response,
                            body
                        };
                        if (!(result.statusCode< 400) && self.logErrors)
                        {
                            console.error({
                                requestOpts,
                                result
                                // logErrors
                            })
                        }
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

