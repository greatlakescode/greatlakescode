import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./../BaseComponent";


import Loading from "./../loading/Loading";
import TestHelper from "../../utils/TestHelper";
import RequestHelper from "../../utils/RequestHelper";
import MessageService from "../../utils/MessageService";
import TextField from "@material-ui/core/TextField/TextField";

// import UserMe from "./users/user-me";
// import AdminLogs from "./logs/admin-logs";
// import ServerInfo from "./server/server-info";
// import BlogCreate from "./blog/BlogCreate";

//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class TicketsComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`kanban`);

    constructor()
    {
        super();

        this.state.form = {
            name: '',
            description: ''
        };
        this.state.records = [];
    }


    submit = async (event) => {
        console.log(`submit`);
        event.preventDefault();
        // let q = this.state.q;
        let data = this.state.form;

        try {
            let response = await this.requestHelper.post(`ticket/post`,
                data);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);
                return this.refresh();
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(`saved blog`);
        }
    };


    async getRecords()
    {

        // await this.wait(100);
        //status
        // statusText
        // data
        // headers
        let response = await this.requestHelper.get(`ticket/list`);

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

            return data;

        }

    }


    async populateAsyncState() {
        let records = await this.getRecords();

        this.setState({records});

    }


    handleForm = name => event => {
        console.log(`handleForm`,name,event,this.state.form);
        let form = this.state.form;
        form[name] = event.target.value;
        this.setState({
            form
        });
    };

    moveStatus = async (record,status) => {
        let data = {
            _id: record._id,
            status
        };

        try {
            let response = await this.requestHelper.post(`ticket/post`,
                data);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);
                return this.refresh();
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(`saved blog`)
        }
    }

    delete = async (team) => {
        // let q = this.state.q;
        let data = {
            _id: team._id,
            is_deleted: 1,
            name: team.name
        };

        try {
            let response = await this.requestHelper.post(`team/post`,
                data);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);
                return this.refresh();
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(`saved blog`)
        }
    };

    //TODO have a better board for moving these tickect statuses.
    render() {
        if (this.state.loading)
        {
            return (<Loading/>)
        }
        if (this.state.redirect) {

            MessageService.warn(`Redirecting to login`);
            return (<Redirect to='/login' />);
            {/*<Router>*/}
            {/*<Redirect to='/login' />*/}

            {/*</Router>*/}
            {/*);*/}
        }

        //react-frontend/src/components/blog/BlogTable.js
        return (
            <div>
                <h1>Tickets</h1>

                <form onSubmit={this.submit}>
                    {/*className={classes.formControl}*/}
                    {/*<FormControl >*/}
                    {/*<InputLabel htmlFor="q">Search</InputLabel>*/}
                    {/*<Input id="q"*/}
                    {/*value={this.state.q}*/}
                    {/*onChange={this.handleChange('q')}/>*/}
                    {/*</FormControl>*/}

                    {/*                        className={classes.textField}
*/}
                    {/*                        type="search"
*/}
                    <TextField
                        // multiline={true}
                        // rows={2}
                        // rowsMax={4}
                        name="note"
                        type="text"
                        label="Name"
                        margin="normal"
                        value={this.state.form.name}
                        onChange={this.handleForm('name')}
                    />


                    <TextField
                        multiline={true}
                        rows={10}
                        // rowsMax={4}
                        name="description"
                        type="text"
                        label="Description"
                        margin="normal"
                        value={this.state.form.description}
                        onChange={this.handleForm('description')}
                    />


                    <input type='submit' label="Submit" />

                </form>
                <div>
                    <pre>{JSON.stringify(this.state.records)}</pre>

                    <div>
                        {(this.state.records || []).map(record => {
                            // let link = `/app/blog/edit/${row._id}`;
                            let moveForward = <div></div>;
                            let moveBackward = <div></div>;

                            //https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e?gi=246da2409821
                            if (record.status === 'todo')
                            {
                                moveForward = <div><button
                                onClick={() =>
                                {
                                    console.log(`move status`,`in_progress`,record);
                                    this.moveStatus(record,`in_progress`);

                                }}
                                >Move in_progress</button></div>;
                            }
                            else if (record.status === 'in_progress')
                            {
                                moveBackward = <div><button
                                    onClick={() =>
                                    {
                                        this.moveStatus(record,`todo`);
                                    }}

                                >Move todo</button></div>;

                                moveForward = <div><button
                                    onClick={() =>
                                    {
                                        this.moveStatus(record,`complete`);
                                    }}

                                >Move complete</button></div>;
                            }

                            return (
                                <div
                                    data-x-id={record._id}
                                    key={record._id}
                                >
                                    {record.name} - {record.status}

                                    <div>
                                        {record.description}
                                    </div>

                                    {/*<button*/}
                                    {/*onClick={() => {this.delete(team)}}*/}
                                    {/*>Delete</button>*/}

                                    <br/>
                                    {moveBackward}
                                    {moveForward}
                                </div>
                            )

                        })}
                    </div>

                    </div>

            </div>
        )
    }
}