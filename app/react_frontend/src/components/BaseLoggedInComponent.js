import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./BaseComponent";


import Loading from "./loading/Loading";
import MessageService from "../utils/MessageService";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class BaseLoggedInComponent extends BaseComponent {

    //this is called if the user is logged in and is not loading.
    mainRender()
    {

        return (
            <div>
                <h2>logged in</h2>
            </div>
        )
    }



    //add logged in component base class
    render() {

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

        return this.mainRender();
    }
}