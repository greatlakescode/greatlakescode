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
import TVSearchComponent from "../tv/TVSearchComponent";
import SteamGameSearchComponent from "./SteamGameSearchComponent";
import SteamGameWishlistComponent from "./SteamGameWishlistComponent";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class SteamComponent extends BaseLoggedInComponent {

    //cooking endpoints. w/ grocery list.
    requestHelper = RequestHelper.getInstance(`steam`);


    constructor()
    {
        super();
    }




    async populateAsyncState() {

    }

    //this is called if the user is logged in and is not loading.
    mainRender()
    {
        let match = this.props.match;

        // MessageService.confirmWithInput(``);

        return (
            <div>


                <h2>Steam</h2>

                {/*<Link className="nav-link" to={`${match.path}/games`}>My Shows</Link>*/}
                <Link className="nav-link" to={`${match.path}/search-games`}>Search Games</Link>
                <Link className="nav-link" to={`${match.path}/wishlist`}>wishlist</Link>

                {<Route path={`${match.path}/search-games`}
                        component={SteamGameSearchComponent} />}


                {<Route path={`${match.path}/wishlist`}
                        component={SteamGameWishlistComponent} />}

            </div>
        )
    }
}