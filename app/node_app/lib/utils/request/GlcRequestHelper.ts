//Requests made to self api



import RequestHelper from "../RequestHelper";

export default class GlcRequestHelper
extends RequestHelper
{

    //
    constructor()
    {
        super();

        this.baseUrl = process.env.GREATLAKESCODE_API_URL || 'https://api.greatlakescode.us';
    }
}