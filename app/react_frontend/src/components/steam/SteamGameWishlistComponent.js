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
export default class SteamGameWishlistComponent extends BaseLoggedInComponent {

    requestHelper = RequestHelper.getInstance(`steam`);


    constructor()
    {
        super();

        // this.state.weather = null;

        this.state.wishlist = null;

        this.state.form = {
            name: ''
        };


    }

    async populateWishlist()
    {
        let self = this;
        let rh = self.requestHelper;
        let params = {
            name: this.state.form.name
        };
        console.log(`profile form submit`,params);

        try {
            let response = await rh.get(`/getwishlist`,
                params);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                this.setState({wishlist:data.data});
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(``);
        }

    }


    async populateAsyncState()
    {
        await this.populateWishlist();
    }




    render() {
        let match = this.props.match;


        let search = 'name';


        return (
            <div>



                <div>
                    {(this.state.wishlist || []).map(app => {
                        {/*let image;*/}

                        return (
                            <div className="steam-app"
                            key={app.appid}>

                                {app.name}

                                <SteamAppViewComponent app={app}
                                is_wishlist={true}
                                />

                            </div>
                        )

                    })}
                </div>

                <pre>{JSON.stringify(this.state.wishlist,null,' ')}</pre>

            </div>
        )
    }
}