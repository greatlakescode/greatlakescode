import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./BaseComponent";


import Loading from "./loading/Loading";
import TestHelper from "../utils/TestHelper";
import RequestHelper from "../utils/RequestHelper";
import MessageService from "../utils/MessageService";
import TextField from '@material-ui/core/TextField';

// import UserMe from "./users/user-me";
// import AdminLogs from "./logs/admin-logs";
// import ServerInfo from "./server/server-info";
// import BlogCreate from "./blog/BlogCreate";

//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class LoginComponent extends BaseComponent {


    //https://reactjs.org/docs/forms.html#controlled-components
    state = {
        'username': '',
        'password': ''
    };

    requestHelper = RequestHelper.getInstance(`auth`);


    async populateAsyncState() {
        // let notes = await this.getNotes();

        // this.setState({notes});

    }

    submit = async (event) => {
        console.log(`submit`);
        event.preventDefault();
        let q = this.state.q;
        let data = {
            username: this.state.username,
            password: this.state.password,
        };

        let params = {
            q
        };

        try {
            let response = await this.requestHelper.post(`login`,
                data);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);
                let {set_headers} = data;
                let {authorization,x_token} = set_headers;
                RequestHelper.setAuthorization(authorization,x_token);


                this.setState({
                    redirect: '/'
                    })
            }
            else {
                console.error(params);
            }
        }
        catch (e) {
            MessageService.error(`saved blog`)

        }
    }

    render() {
        if (this.state.loading)
        {
            return (<Loading/>)
        }

        if (this.state.redirect) {

            MessageService.warn(`Redirecting to login`);
            return (<Redirect to={this.state.redirect} />);
            {/*<Router>*/}
            {/*<Redirect to='/login' />*/}

            {/*</Router>*/}
            {/*);*/}
        }

        return (
            <div>
                <h1>Login</h1>
                <div>
                    <pre>
                        {JSON.stringify(this.state)}
                    </pre>
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
                            // type="search"
                            // id="search"
                            name="username"
                            type="username"
                            label="Login"
                            margin="normal"
                            value={this.state.username}
                            onChange={this.handleChange('username')}

                        />

                        <TextField
                            // type="search"
                            // id="search"
                            name="password"
                            type="password"
                            label="Password"
                            margin="normal"
                            value={this.state.password}
                            onChange={this.handleChange('password')}

                        />

                        <input type='submit' label="Submit" />
                    </form>
                    {/*<form>*/}
                    {/*    <input name="username">*/}
                    {/*        <input name="password">*/}
                    {/*            */}
                    {/*</form>*/}
                </div>




            </div>
        )
    }
}