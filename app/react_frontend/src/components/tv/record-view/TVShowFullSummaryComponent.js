import React, {Component} from 'react';
import moment from 'moment';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./../../BaseComponent";
import MessageService from "../../../utils/MessageService";
import RequestHelper from "../../../utils/RequestHelper";
import ShowImageComponent from "./ShowImageComponent";


export default class TVShowFullSummaryComponent
    extends BaseComponent

{

    requestHelper = RequestHelper.getInstance(`tv`);


    //https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#preferred-solutions

    state = { show: [],
        loadingSeen: false
    };

    constructor(props)
    {
        super(props);

        //this.props is undefined in the constructor.
        console.log(`props`,props,this.props);
        this.state.show = props.show;
    }





    /**
     *
     *      "id": 1640050,
     "url": "http://www.tvmaze.com/episodes/1640050/general-hospital-2019-04-18-ep-14283",
     "name": "Ep. #14283",
     "season": 2019,
     "number": 75,
     "airdate": "2019-04-18",
     "airtime": "14:00",
     "airstamp": "2019-04-18T18:00:00+00:00",
     "runtime": 60,


     //seen_count: 1/0

     * @param show
     * return
     * id,name,airdatereadable
     */
    getNextPreviousEpisodes(show)
    {
        if (!show || !show.show || !show.show._embedded)
        {
            return {
                nextepisode: null,
                    previousepisode: null
            };
        }
        console.log(show,show.show._embedded);
        let {nextepisode,previousepisode} =  show.show._embedded;


        return {
            nextepisode: this.getEpisodeInfo(nextepisode),
            previousepisode: this.getEpisodeInfo(previousepisode)

        }

    }


    /**
     *      *      "id": 1640050,
     "url": "http://www.tvmaze.com/episodes/1640050/general-hospital-2019-04-18-ep-14283",
     "name": "Ep. #14283",
     "season": 2019,
     "number": 75,
     "airdate": "2019-04-18",
     "airtime": "14:00",
     "airstamp": "2019-04-18T18:00:00+00:00",
     "runtime": 60,
     * @param episode
     * @returns {*}
     */

    //format lookup
    //https://devhints.io/moment
    getEpisodeInfo(episode)
    {
        if (!episode)
        {
            return null;
        }


        episode.formatted_airstamp = moment(episode.airstamp).format('llll');


        // airdate: "2019-04-17"
        // airstamp: "2019-04-17T18:00:00+00:00"
        // airtime: "14:00"
        console.log(`getEpisodeInfo`,episode);


        return episode;

    }

    seenUpdate = async (e,num) =>
    {
        if (this.state.loadingSeen)
        {
            MessageService.error(`Could not update while already updating`);

            return;
        }
        console.log(`seenUpdate`);
        e.seen_count+=num;

        this.setState({loadingSeen: true});

        try {
            let response = await
                this.requestHelper.post(`/my/episodes/${e.id}/update_count/` + e.seen_count);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                // this.refresh();
            }
            else {
                MessageService.error(`${response.status}`);
            }
        }
        catch (e) {
            MessageService.error(``);
        }


        this.setState({show:this.show});


        this.setState({loadingSeen: false});


        //TODO set state.
    }


    show;

    render()
    {

        console.log(`props`,this.props);

        let show = this.show = this.state.show;
        // console.log(this.props);

        let {nextepisode,previousepisode} = this.getNextPreviousEpisodes(show);

        let nextepisodehtml,previousepisdoehtml;

        if (nextepisode)
        {
            let e = nextepisode;
            nextepisodehtml = <div>
                <div>Next: {e.formatted_airstamp} - {e.name}
                    <div>Seen: {e.seen_count} <button
                        onClick={() => {
                            this.seenUpdate(e,-1)
                        }}
                    >-</button><button
                        onClick={() => {
                            this.seenUpdate(e,1)
                        }}
                    >+</button>
                    </div>
                </div>

                {/*<div>Next episode: {nextepisode.name}</div>*/}
                {/*<div>Airtime: {nextepisode.formatted_airstamp}</div>*/}
                </div>
        }

        if (previousepisode)
        {
            let e = previousepisode;
            previousepisdoehtml = <div>
                <div>Previous: {e.formatted_airstamp} - {e.name}</div>
                <div>Seen: {e.seen_count} <button
                    onClick={() => {
                        this.seenUpdate(e,-1)
                    }}
                >-</button><button
                    onClick={() => {
                        this.seenUpdate(e,1)
                    }}
                >+</button>
                </div>

                {/*<div>Previous episode: {previousepisode.formatted_airstamp}</div>*/}
                {/*<div>Name: {previousepisode.name}</div>*/}
            </div>
        }

        // "_embedded": {
        // "nextepisode": {
        //     "id": 1640050,
        //         "url": "http://www.tvmaze.com/episodes/1640050/general-hospital-2019-04-18-ep-14283",
        //         "name": "Ep. #14283",
        //         "season": 2019,
        //         "number": 75,
        //         "airdate": "2019-04-18",
        //         "airtime": "14:00",
        //         "airstamp": "2019-04-

        return (
            <div>
                <h3>{show.show.name}</h3>

                {previousepisdoehtml}
                {nextepisodehtml}

{/*                image.medium*/}
<ShowImageComponent image={show.show.image}/>

                {/*<pre>{JSON.stringify(this.props,null,' ')}</pre>*/}
        </div>)

    }


}