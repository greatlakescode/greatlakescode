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


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class ExampleListComponent extends BaseLoggedInComponent {

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

        return (
            <div>

                <h2>Example List</h2>
                
                <div>
                </div>


            </div>
        )
    }
}