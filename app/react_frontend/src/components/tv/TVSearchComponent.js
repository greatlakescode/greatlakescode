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


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class TVSearchComponent extends BaseComponent {

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

                <form onSubmit={this.submit}>
                <TextField
                           name={search}
                           type="text"
                           label={search}
                           margin="normal"
                           value={this.state.form[search]}
                           onChange={this.handleForm(search)}
                />


                <input type='submit' label="Search" />

            </form>



                <div>
                    {(this.state.searchShows || []).map(show => {

                        let image;
                        if (show.show.image && show.show.image.medium)
                        {
                            image = show.show.image.medium;
                        }
                        let showImage = <span></span>;
                        if (image)
                        {
                            showImage = <span><img src={image} /></span>
                        }

                        return (
                            <div className="tv-show"
                                key={show.show.id}
                            >
                                <h1>{show.show.name}</h1>


                                {showImage}


                                <div>
                                    {show.show.summary}
                                </div>

                                <pre>{JSON.stringify(show.show.image,null,' ')}</pre>

                                {/*<img src={show.show.image.medium} />*/}

                                <button
                                    onClick={() =>
                                    {
                                        this.addShow(show);
                                    }}
                                >
                                    Add Show
                                </button>
                            </div>
                        );
                    })}
                </div>

                <pre>{JSON.stringify(this.state.searchShows,null,' ')}</pre>

            </div>
        )
    }
}