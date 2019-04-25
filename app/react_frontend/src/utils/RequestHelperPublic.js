// import axios from 'axios'
// import EnvHelper from "./env-helper";
// import MessageService from "./message-service";
import RequestHelper from "./request-helper";


export default class RequestHelperPublic extends RequestHelper
{

    static getHeaders()
    {

        let headers = {'x-russ': 'public',
            'x-is-public': 'no'
        };
        return headers;
    }
}