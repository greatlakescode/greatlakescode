import JsonWriter from "../../utils/file/json/JsonWriter";
import SteamService from "../../services/steam/SteamService";

//     * db.stores.createIndex( { name: "text", description: "text" } )
(async function()
{

    try {
        //mongodb connection
        let {db} = await require('./../init_script')();
        let steamService:SteamService = await SteamService.initService({
            db,
        });

        await steamService.addRequiredIndexes();

        console.log(`finished`);

        setTimeout(() => {
            process.exit(0)
        },1000);

    }
    catch (e)
    {
        console.error(e);
        process.exit(1);
    }




})();