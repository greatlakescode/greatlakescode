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
export default class TeamsComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`kanban`);

    constructor()
    {
        super();

        this.state.form = {
            name: ''
        };
        this.state.teams = [];
    }


    submit = async (event) => {
        console.log(`submit`);
        event.preventDefault();
        // let q = this.state.q;
        let data = this.state.form;

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


    async getRecords()
    {
        // await TestHelper.wait(1000);

        //status
        // statusText
        // data
        // headers
        let teamResponse = await this.requestHelper.get(`team/list`);
        console.log(`teamResponse`,teamResponse);

        if (teamResponse.status >= 400)
        {
            if (teamResponse.status === 401)
            {
                console.log(`redirect to login`);
                this.setState({
                    redirect: '/login'
                })
            }
            else if (teamResponse.status === 404)
            {
                MessageService.error(`Failed to connect to api.`);
            }

        }
        else {
            console.log(`teamResponse`,teamResponse);

            let {data} = teamResponse;

            return data;

        }

        // requestHelper.get


    }


    async populateAsyncState() {
        let teams = await this.getRecords();

        this.setState({teams});

    }


    handleForm = name => event => {
        this.setState({
            form: {
                [name]: event.target.value,
            }
        });
    };


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
                <h1>Teams</h1>
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
                        label="Note"
                        margin="normal"
                        value={this.state.form.name}
                        onChange={this.handleForm('name')}
                    />


                    <input type='submit' label="Submit" />

                </form>

                <div>
                    <pre>{JSON.stringify(this.state.teams)}</pre>

                    <div>
                        {(this.state.teams || []).map(team => {
                            // let link = `/app/blog/edit/${row._id}`;

                            return (
                                <div
                                    data-x-id={team._id}
                                    key={team._id}
                                >
                                    {team._id} - {team.name}

                                    <button
                                    onClick={() => {this.delete(team)}}
                                    >Delete</button>
                                    <br/>
                                    <pre>members: {JSON.stringify(team.member_list,null,' ')}</pre>
                                </div>
                            )

                        })}
                    </div>

                    </div>

            </div>
        )
    }
}