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
import TextField from "@material-ui/core/TextField/TextField";
import TeamsComponent from "./TeamsComponent";
import TicketsComponent from "./TicketsComponent";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class KanbanComponent extends BaseComponent {

    // requestHelper = RequestHelper.getInstance(`notes`);

    constructor()
    {
        super();

        // this.state.noteForm = {
        //     note: '',
        // }
    }

    async populateAsyncState() {

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

                {/*In all kanban routes*/}
                <h1>Kanban</h1>
                <ul>
                    <li>
                        <Link to={`${match.path}/teams`}>Teams</Link>

                    </li>
                    <li>
                        <Link to={`${match.path}/tickets`}>Tickets</Link>

                    </li>

                </ul>

                <pre>{JSON.stringify(match)}</pre>

                {/*{<Route exact path={`${match.path}`} component={TeamsComponent} />}*/}

                {<Route path={`${match.path}/teams`}
                        component={TeamsComponent} />}
                {<Route path={`${match.path}/tickets`}
                        component={TicketsComponent} />}




            </div>
        )
    }
}