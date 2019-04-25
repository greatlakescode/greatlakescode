import JsonWriter from "../../utils/file/json/JsonWriter";
import SteamService from "../../services/steam/SteamService";

(async function()
{

    try {
        //mongodb connection
        let {db} = await require('./../init_script')();

        console.log(`get_steam_games`);

        let jsonWriter = await JsonWriter.initSimpleFilename(`test.json`);
        let appWriter = await JsonWriter.initSimpleFilename(`steam_apps.json`);

        let steamService:SteamService = await SteamService.initService({
            db,
        });


        //getting the app list populates new apps into the mongodb
        // let apps = await steamService.getAppList(
        //     {
        //         filters: {
        //             name: `forgotton`
        //         }
        //     }
        // );

        // let apps = await steamService.getAppList(
        //     // {
        //     //     filters: {
        //     //         name: `forgotton`
        //     //     }
        //     // }
        // );
        // console.log(`got steam apps`,apps);


        // let apps2 = await steamService.getAppList(
        //     {
        //         filters: {
        //             $text: {
        //                 $search: `forgotton`
        //             }
        //             // name: `forgotton`
        //         }
        //     }
        // );
        // console.log(`got steam apps`,apps2);
        // { _id: 5cbb63d0bff88026d4d83116,
        //     appid: 630420,
        //     name: 'Forgotton Anne Collectors Upgrade',
        //     created: 1555784623506,
        //     updated: 1555784623506 }

        // await appWriter.writeData({
        //     apps
        // });


        let apps3 = await steamService.searchAppsByName(`forgotton`);
        console.log(`got steam apps`,apps3);


        // new SteamService({
        //     db
        // });

        //
        // await jsonWriter.writeData({
        //     test:1
        // });

        console.log(`finished`);

        setTimeout(() => {
            process.exit(0)
        },1000);

        //https://stackoverflow.com/questions/21176733/what-the-scenario-call-fs-close-is-necessary
        // await jsonWrite.close();

    }
    catch (e)
    {
        console.error(e);
        process.exit(1);
    }




})();