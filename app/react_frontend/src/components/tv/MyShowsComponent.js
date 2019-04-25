import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./../BaseComponent";


import Loading from "./../loading/Loading";
import MessageService from "../../utils/MessageService";
import RequestHelper from "../../utils/RequestHelper";
import TextField from "@material-ui/core/TextField/TextField";
import TeamsComponent from "../kanban/TeamsComponent";
import TVShowFullSummaryComponent from "./record-view/TVShowFullSummaryComponent";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class MyShowsComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`tv`);


    constructor()
    {
        super();

        // this.state.weather = null;

        this.state.myShows = null;



    }

    async populateMyShows()
    {
        try {
            let params = {};
            let response = await this.requestHelper.get(`/my/shows`,
                params);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                this.setState({myShows:data.data});
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(``);
        }
    }


    async populateAsyncState() {
        await this.populateMyShows();

    }

    deleteShow = async (show) => {
        try {
            let response = await
                this.requestHelper.post(`/my/shows/delete/` + show._id);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                this.refresh();
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(``);
        }
    };



    render() {
        let match = this.props.match;


        if (this.state.loading)
        {
            return (<Loading/>)
        }
        if (this.state.redirect) {
            MessageService.warn(`Redirecting to login`);
            return (<Redirect to='/login' />);
        }

        let search = 'search';




        return (
            <div>

                <h2>My Shows</h2>
                <div>
                    {(this.state.myShows || []).map(show => {

                        return (
                            <div className="tv-show"
                                key={show._id} //nodemon id
                            >
                                <TVShowFullSummaryComponent show={show} />

                                <button
                                    onClick={() =>
                                    {
                                        this.deleteShow(show);
                                    }}
                                >
                                    Delete Show
                                </button>

                                {/*<pre>{JSON.stringify(show,null,' ')}</pre>*/}

                            </div>
                        );
                    })}
                </div>


            </div>
        )
    }
}