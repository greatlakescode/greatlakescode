import BaseFileWriter from "../BaseFileWriter";

const path = require('path')
export default class JsonWriter
    extends BaseFileWriter
{


    async init()
    {
        await this.populateFD();
    }


   public static async create(opts:{
        basepath,
       name
    })
        {
            let self = this;
            let {basepath,name} = opts;


            let fullFilepath = path.resolve(basepath,name);
            let obj = new self(fullFilepath);

            await obj.init();

            return obj;
    }


    public static async createPermanentWriter(name)
    {

        console.log( process.env._GREATLAKESCODE_FILE_PATH);
        return this.create({
            name,
            basepath: process.env._GREATLAKESCODE_FILE_PATH
        });

    }

    /**
     *
     * @param data
     */
    public async writeData(data)
    {
        return this.write(JSON.stringify(data,null,' '));

    }



}