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
import TextField from "@material-ui/core/TextField/TextField";

// import UserMe from "./users/user-me";
// import AdminLogs from "./logs/admin-logs";
// import ServerInfo from "./server/server-info";
// import BlogCreate from "./blog/BlogCreate";

//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class NotesComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`notes`);

    constructor()
    {
        super();

        this.state.noteForm = {
            note: '',
            note2: ''
        }
    }

    async getNotes()
    {
        // await TestHelper.wait(1000);

        //status
        // statusText
        // data
        // headers
        let notesResponse = await this.requestHelper.get(`notes`);
        console.log(`notesResponse`,notesResponse);

        if (notesResponse.status >= 400)
        {
            console.log(`redirect to login`);
            this.setState({
                redirect: '/login'
            })
        }

        // requestHelper.get


    }

    submit = async (event) => {
        console.log(`submit`);
        event.preventDefault();
        let q = this.state.q;
        let data = this.state.noteForm;

        let params = {
            q
        };

        try {
            let response = await this.requestHelper.post(`notes`,
                data);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);
                return this.refresh();
            }
            else {
                console.error(params);
            }
        }
        catch (e) {
            MessageService.error(`saved blog`)
        }
    };

    async populateAsyncState() {
        let notes = await this.getNotes();

        this.setState({notes});

    }


    handleNoteForm = name => event => {
        this.setState({
            noteForm: {
                [name]: event.target.value,
            }
        });
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

        return (
            <div>
                <h1>Notes</h1>
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
                        multiline={true}
                        rows={2}
                        rowsMax={4}
                        // type="search"
                        // id="search"
                        name="note"
                        type="text"
                        label="Note"
                        margin="normal"
                        value={this.state.noteForm.note}
                        onChange={this.handleNoteForm('note')}
                    />

                    <TextField
                        multiline={true}
                        rows={2}
                        rowsMax={4}
                        // type="search"
                        // id="search"
                        name="note2"
                        type="text"
                        label="Note"
                        margin="normal"
                        value={this.state.noteForm.note2}
                        onChange={this.handleNoteForm('note2')}
                    />

                    <input type='submit' label="Submit" />

                </form>



            </div>
        )
    }
}