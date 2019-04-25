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
import BaseLoggedInComponent from "../BaseLoggedInComponent";
import SteamAppViewComponent from "./SteamAppViewComponent";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class SteamGameSearchComponent extends BaseLoggedInComponent {

    requestHelper = RequestHelper.getInstance(`steam`);


    constructor()
    {
        super();

        // this.state.weather = null;

        this.state.searchApps = null;

        this.state.form = {
            name: ''
        };


    }


    async populateAsyncState() {

    }


    async handleFormSubmit(data)
    {
        let self = this;
        let rh = self.requestHelper;
        let params = {
            name: this.state.form.name
        };
        console.log(`profile form submit`,params);

        try {
            let response = await rh.get(`/search`,
                params);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                this.setState({searchApps:data.data});
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(``);
        }


    }



    render() {
        let match = this.props.match;


        let search = 'name';


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
                    {(this.state.searchApps || []).map(app => {
                        {/*let image;*/}

                        return (
                            <div className="steam-app"
                            key={app.appid}>

                                {app.name}

                                <SteamAppViewComponent app={app} />

                            </div>
                        )

                    })}

                        {/*let image;*/}
                        {/*if (show.show.image && show.show.image.medium)*/}
                        {/*{*/}
                            {/*image = show.show.image.medium;*/}
                        {/*}*/}
                        {/*let showImage = <span></span>;*/}
                        {/*if (image)*/}
                        {/*{*/}
                            {/*showImage = <span><img src={image} /></span>*/}
                        {/*}*/}

                        {/*return (*/}
                            {/*<div className="tv-show"*/}
                                 {/*key={show.show.id}*/}
                            {/*>*/}
                                {/*<h1>{show.show.name}</h1>*/}


                                {/*{showImage}*/}


                                {/*<div>*/}
                                    {/*{show.show.summary}*/}
                                {/*</div>*/}

                                {/*<pre>{JSON.stringify(show.show.image,null,' ')}</pre>*/}

                                {/*/!*<img src={show.show.image.medium} />*!/*/}

                                {/*<button*/}
                                    {/*onClick={() =>*/}
                                    {/*{*/}
                                        {/*this.addShow(show);*/}
                                    {/*}}*/}
                                {/*>*/}
                                    {/*Add Show*/}
                                {/*</button>*/}
                            {/*</div>*/}
                        {/*);*/}
                    {/*})}*/}
                </div>

                <pre>{JSON.stringify(this.state.searchApps,null,' ')}</pre>

            </div>
        )
    }
}