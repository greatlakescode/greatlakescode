export default class User
{

    /**
     *
     * req.locals._user //raw user limited use
     *
     * req.locals._User //instantiated user class.
     *
     * pass in user data
     * @param data
     */
    constructor(protected data:{
        _id,
        username,
        settings: {
            zip
        }
    })
    {

    }


    get zip()
    {
        console.log(this.data,this.data.settings,this.data.settings.zip);
        return this.data.settings.zip;
    }

    get json()
    {
        return this.data;
    }


    get username()
    {
        return this.data.username;
    }

}