import RequestHelper from "../RequestHelper";

export default class DatadogRequest
    extends RequestHelper
{

    baseUrl = `https://api.datadoghq.com/api/v1`;
    api_key;

    constructor(opts?)
    {
        super();
        opts = opts || {};
        this.api_key = opts.api_key || process.env.GREATLAKESCODE_DATADOG_API_KEY;
        if (!this.api_key)
        {
            throw new Error(`api_key must be set using GREATLAKESCODE_DATADOG_API_KEY or by passing api_key on construction`);
        }
    }


    //https://docs.datadoghq.com/api/?lang=bash#post-timeseries-points
    //'https://api.datadoghq.com/api/v1/series?api_key=<YOUR_API_KEY>'
    async postMetricSeries(seriesJsonRequest:{
        series: Array<{
            metric,
            type?, //defaults as gauge
            interval?,
            points,
            host?,
            tags?
        }>,

    })
    {
        let url = `/series`;
        let qs = {
            api_key: this.api_key
        };
        return this.postJson({
            url,
            json: seriesJsonRequest
        });
    }

    async postMetric(metric:{
        metric,
        type?, //defaults as gauge
        interval?,
        points,
        host?,
        tags?
    })
    {
        return this.postMetricSeries({series:[metric]});
    }

//     currenttime=$(date +%s)
//
//     curl  -X POST -H "Content-type: application/json" \
// -d "{ \"series\" :
//     [{\"metric\":\"test.metric\",
// \"points\":[[$currenttime, 20]],
// \"type\":\"rate\",
// \"interval\": 20,
// \"host\":\"test.example.com\",
// \"tags\":[\"environment:test\"]}
// ]
// }" \
// 'https://api.datadoghq.com/api/v1/series?api_key=05e2ffce06f231ac9ef3f601559b4d91'

// http://api.tvmaze.com/search/shows?q=girls

}
