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
import MyShowsComponent from "../tv/MyShowsComponent";
import ExampleListComponent from "./ExampleListComponent";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class ExampleComponent extends BaseLoggedInComponent {

    //cooking endpoints. w/ grocery list.
    requestHelper = RequestHelper.getInstance(`profile`);


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

        console.log(`match`,match);

        return (
            <div>



                <h2>Example</h2>


                <div>
                    <Link
                        className="nav-link"
                        to={`${match.path}/example-list`}
                    >Example List</Link>

                    <div>
                        {<Route path={`${match.path}/example-list`}
                                component={ExampleListComponent} />}
                    </div>
                </div>


            </div>
        )
    }
}