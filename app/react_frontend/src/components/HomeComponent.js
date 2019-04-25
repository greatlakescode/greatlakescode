import React, {Component} from 'react';
import {
    // browserHistory,
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
} from 'react-router-dom'
import BaseComponent from "./BaseComponent";


export default class HomeComponent extends BaseComponent {



    render()
    {


        return (
            <div>
                Hello world.
            </div>
        )
    }
}

