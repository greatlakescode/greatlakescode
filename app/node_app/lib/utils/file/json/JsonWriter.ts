import BaseFileWriter from "../BaseFileWriter";

export default class JsonWriter
    extends BaseFileWriter
{


    /**
     *
     * @param data
     */
    public async writeData(data)
    {
        return this.write(JSON.stringify(data,null,' '));

    }



}