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


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class WeatherComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`weather`);


    constructor()
    {
        super();

        this.state.weather = null;

    }

    async getRecord()
    {

        // await this.wait(100);
        //status
        // statusText
        // data
        // headers
        let response = await this.requestHelper.get(`my-weather`);

        if (response.status >= 400)
        {
            if (response.status === 401)
            {
                console.log(`redirect to login`);
                this.setState({
                    redirect: '/login'
                })
            }
            else if (response.status === 404)
            {
                MessageService.error(`Failed to connect to api.`);
            }

        }
        else {


            let {data} = response;

            console.log(`weather`,data);
            return data;

        }

    }

    async populateAsyncState() {
        let weather = await this.getRecord();
        console.log(`weather`,weather);

        this.setState({weather});

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

        return (
            <div>

                <h1>Weather</h1>
                <pre>{JSON.stringify(this.state.weather,null,' ')}</pre>

            </div>
        )
    }
}