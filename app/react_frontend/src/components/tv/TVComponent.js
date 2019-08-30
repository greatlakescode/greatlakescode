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
import TVSearchComponent from "./TVSearchComponent";
import MyShowsComponent from "./MyShowsComponent";
import LoginComponent from "./../LoginComponent";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class TVComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`tv`);


    constructor()
    {
        super();

        // this.state.weather = null;

        this.state.searchShows = null;

        this.state.form = {
            search: ''
        };


    }


    async populateAsyncState() {
        // let weather = await this.getRecord();
        // console.log(`weather`,weather);
        //
        // this.setState({weather});

    }


    async handleFormSubmit(data)
    {
        let self = this;
        let rh = self.requestHelper;
        let params = {
            q: this.state.form.search
        };
        console.log(`profile form submit`,params);

        try {
            let response = await rh.get(`/search/shows`,
                params);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                this.setState({searchShows:data});
                // this.state.searchShows
                // return this.refresh();
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(``);
        }


    }

    addShow = async (show) => {

        try {
            let response = await this.requestHelper.post(`/my/shows/add`,{
                show_id: show.show.id
            });



            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                MessageService.success(`Added show`);

            }
            else {
                MessageService.error(`Failed to add show`)

            }
        }
        catch (e) {
            MessageService.error(``)
        }
    }


    render() {

        console.log(`TVComponent render start`);
        let match = this.props.match;

        if (!this.requestHelper.getIsLoggedIn())
        {
            MessageService.warn(`Redirecting to login`);
            return (<Redirect to='/login' />);
        }

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

                <h1>TV</h1>

                <Link className="nav-link" to={`${match.path}/my-shows`}>My Shows</Link>
                <Link className="nav-link" to={`${match.path}/search-shows`}>Search Shows</Link>

                {<Route path={`${match.path}/search-shows`}
                        component={TVSearchComponent} />}

                {<Route path={`${match.path}/my-shows`}
                        component={MyShowsComponent} />}




            </div>

        )
    }
}