import BaseManualTest from "../BaseManualTest";
import DatadogRequest from "../../../utils/datadog/DatadogRequest";

export default class DataDogMetricTest
    extends BaseManualTest
{

    db;



    async init()
    {
        await super.init();
    }


    async run()
    {
        console.log(`running tests`,this.constructor.name);

        let ddRequest = new DatadogRequest();


    }



}



if (require.main === module) {
    DataDogMetricTest.runAsScript(true);
}