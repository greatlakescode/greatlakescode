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
export default class WebsocketComponent extends BaseComponent {


    websocket;




    constructor()
    {
        super();

        //https://www.websocket.org/echo.html
        this.state = {};
        this.state.form = {
            location: '',
            message: ''
        };

        this.state.requestHistory = [];
    }


    async handleFormSubmit(data)
    {
        let self = this;
        console.log(`submit`,data);

        let {message} = this.state.form;

        console.log(`sending message`,message);

        // self.websocket.send(message);

        await self.openAndSendMessage();

    }

    async openAndSendMessage()
    {
        let self = this;
        console.log(`openAndSendMessage`,self);
        let {message,location} = self.state.form;

        return new Promise((resolve) => {

            console.log(`connecting to ${location}`);
            self.websocket = new WebSocket(location);
            self.websocket.onopen = function (evt) {
                console.log(`onopen`, evt);
                self.websocket.send(message);
                resolve();
                // onOpen(evt)
            };

            self.websocket.onerror = function(evt) {
                console.error(`onerror`,evt);
                resolve();
            };

            self.websocket.onmessage = function(evt) {
                console.log(`onmessage`,evt);
                // onMessage(evt)
            };


            self.websocket.onclose = function(evt) {
                console.log(`onclose`,evt);
                // onMessage(evt)
            };
        })
    }


    async handleConnect(data)
    {
        let self = this;
        console.log(`handlConnect`,self,data);

        return new Promise((resolve) => {

            let {location} = self.state.form;
            console.log(`connecting to ${location}`);
            self.websocket = new WebSocket(location);



            self.websocket.addEventListener('open',function(evt) {
                console.log(`onopen`,evt);
                resolve();
                // onOpen(evt)
            });

            self.websocket.addEventListener('error',function(evt) {
                console.error(`onerror`,evt);
                resolve();
            });

            self.websocket.addEventListener('message',function(evt) {
                console.log(`onmessage`,evt);
                // onMessage(evt)
            });


            //https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/onclose
            self.websocket.addEventListener('close' ,function(evt) {
                console.log(`onclose`,evt);
                // onMessage(evt)
            });



        })
    }

    async handleDisconnect(data)
    {

        console.log(`handleDisconnect`,data);
    }


     disconnect = async (event) => {
        let data = this.state.form;
        console.log(`submit`,data);
        event.preventDefault();
        // let q = this.state.q;

        try {
            await this.handleDisconnect(data);
        }
        catch (e) {
            MessageService.error(`Unknown error. Failed to submit.`);
        }
    };


    connect = async (event) => {
        let data = this.state.form;
        console.log(`submit`,data);
        event.preventDefault();
        // let q = this.state.q;

        try {
            await this.handleConnect(data);
        }
        catch (e) {
            console.error(e);
            MessageService.error(`Unknown error. Failed to submit.`);
        }
    };


    render() {
        let match = this.props.match;


        if (this.state.loading)
        {
            return (<Loading/>)
        }

        return (
            <div style={{"margin": "10px"}}>

                <h1>Websocket</h1>


                <form onSubmit={this.submit}>

                <TextField
                    // multiline={true}
                    // rows={2}
                    // rowsMax={4}
                    name="location"
                    type="text"
                    label="location"
                    margin="normal"
                    value={this.state.form.location}
                    onChange={this.handleForm('location')}
                />

                    <button onClick={this.connect}>Connect</button>
                    <button onClick={this.disconnect}>Disconnect</button>
                    <br/>



                    <TextField
                    multiline={true}
                    rows={10}
                    // rowsMax={4}
                    name="message"
                    type="text"
                    label="message"
                    margin="normal"
                    value={this.state.form.message}
                    onChange={this.handleForm('message')}
                />

                    <button type="submit">Request</button>

                </form>

            </div>
        )
    }
}