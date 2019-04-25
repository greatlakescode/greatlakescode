import axios from 'axios'
import EnvHelper from "./env-helper";
import MessageService from "./MessageService";

//https://stackoverflow.com/questions/48743474/how-to-detect-a-401-with-axios-and-stop-the-console-error?rq=1
// const UNAUTHORIZED = 401;
// axios.interceptors.response.use(
//     response => response,
//     error => {
//         const {status} = error.response;
//         if (status === UNAUTHORIZED) {
//             console.log(`unauthorized handler`);
//             // dispatch(userSignOut());
//         }
//         return Promise.reject(error);
//     }
// );


export default class RequestHelper
{

    /**
     *
     * @param instance axios instance
     */
    constructor(instance)
    {
        this.instance = instance;
    }
    //https://github.com/axios/axios
    async get(endpoint, params)
    {
        try {
            // let env = EnvHelper.getEnv();
            // let restUrl = env.API_URL;

            //status
            // statusText
            // data
            // headers
            let instance = this.instance;


            let result = await instance.get(endpoint,{
                data: {},
                params
            });

            // if (result && result.status < 400)
            // {
            //     result.success = true;
            // }

            console.log(`got result`,result);

            return result;
            // .then(response => console.log(response))
        }
        catch (e)
        {
            let response = e.response;
            //status
            // statusText
            // data
            // headers
            console.log(`RequestHelper error`,e,response);
            return e;
        }

    }

    /**
     *
     * @param endpoint
     * @param data
     * @returns {Promise<void>}
     */
    async delete(endpoint,data)
    {

        let instance = this.instance;


        try {
            let result = await instance.delete(endpoint,data);
            return result;
        }
        catch (e)
        {
            console.log(`request-helper`,e);
            let response = e.response;
            if (response)
            {
                console.log(`response`,response);
                if (response.status === 401)
                {
                }
                // window.location = '/login';
                return;

            }
            throw e;
        }
    }


    static getInstance(api_name = 'notes')
    {
        let env = EnvHelper.getApiEnv(api_name);
        let baseUrl = `${env.protocol}://${env.domain}${env.port ? ':' + env.port : ''}${env.api_endpoint}`;
        // let restUrl = env.API_URL;

        //timeout + sinon on the server side cancels these requests.
        const instance = axios.create({
            baseURL: baseUrl,
            headers: this.getHeaders(),
            validateStatus: function (status) {
                return true;
                // return status == 200;
            }
        });

        return new RequestHelper(instance);
    }

    static getHeaders()
    {
        let token = this.getToken();
        let authorization = this.getAuthorization();

        let headers = {'X-Custom-Header': 'foobar',};

        if (token)
        {
            headers['X-TOKEN'] = this.getToken();
        }
        if (authorization)
        {
            headers['authorization'] = authorization;

        }
        return headers;
    }

    //either token or authorization
    static setAuthorization(authorization,x_token)
    {
        if (x_token)
        {
            localStorage.setItem(`x_token`,x_token);
        }
        else {
            localStorage.setItem(`authorization`,authorization);

        }
    }

    //TODO replace auth with token in all places.
    static getAuthorization()
    {
        let auth = localStorage.getItem(`authorization`);
        return auth;
    }

    static getToken()
    {
        let token = localStorage.getItem(`x_token`);
        console.log(`getToken`,token);
        return token;
    }

    getIsLoggedIn()
    {
        if (RequestHelper.getAuthorization() || RequestHelper.getToken())
        {
            return true;
        }
        return false;
    }

    // static getUrlFromEndpoint(endpoint)
    // {
    //     let env = EnvHelper.getEnv();
    //     let restUrl = env.API_URL;
    //     let url = `${restUrl}${endpoint}`;
    //     return url;
    // }


     async post(endpoint,data,options)
    {
        // let env = EnvHelper.getEnv();
        // let restUrl = env.API_URL;
        //
        // let url = this.getUrlFromEndpoint(endpoint);

        let instance = this.instance;


        try {
            let result = await instance.post(endpoint,data);

            if (result && result.status < 400)
            {
                result.success = true;
            }

            return result;

        }
        catch (e)
        {
            let response = e.response;
            if (response)
            {
                console.log(`response`,response);
                if (response.status === 401)
                {

                }
                // window.location = '/login';
                return;

            }
            throw e;
        }

        // return instance;
        // .then(response => console.log(response))
    }

    static setToken(token)
    {
        MessageService.warn(`set token ${token}`);

        localStorage.setItem(`token`,token);
    }
}