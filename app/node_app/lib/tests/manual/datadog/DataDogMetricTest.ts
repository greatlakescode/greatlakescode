import BaseManualTest from "../BaseManualTest";
import DatadogRequest from "../../../utils/datadog/DatadogRequest";

const expect = require('chai').expect;

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

        let result = await ddRequest.postMetric({
            metric: 'test.metric',
            points: [
                {
                    timestamp: Math.floor(Date.now() / 1000),
                    value: 1
                }
            ]
        });

        console.log(`post result`,result);


        expect(result.statusCode).to.be.equal(202);



        result = await ddRequest.postMetricCount({
            interval: 60, //60 second / 1 minute interval (by default?)
            metric: 'test.metric.count',
            points: [
                {
                    // timestamp: Math.floor(Date.now() / 1000), //default to now.
                    value: 1
                }
            ]
        });

        console.log(`post result`,JSON.stringify(result,null,' '));


        expect(result.statusCode).to.be.equal(202);





    }



}



if (require.main === module) {
    DataDogMetricTest.runAsScript(true);
}