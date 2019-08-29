import React, {Component} from 'react';
import './App.css';
import {
    // browserHistory,
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
} from 'react-router-dom'
import HomeComponent from "./components/HomeComponent";
import EnvHelper from "./utils/env-helper";
import {Navbar} from "./components/navigation/Navbar";
import NotesComponent from "./components/NotesComponent";
import LoginComponent from "./components/LoginComponent";
import KanbanComponent from "./components/kanban/KanbanComponent";
import ProfileComponent from "./components/profile/ProfileComponent";
import WeatherComponent from "./components/weather/WeatherComponent";
import TVComponent from "./components/tv/TVComponent";
import GroceryComponent from "./components/home/groceries/GroceryComponent";
import SteamComponent from "./components/steam/SteamComponent";
import ExampleListComponent from "./components/examples/ExampleListComponent";
import ExampleComponent from "./components/examples/ExampleComponent";
import WebsocketComponent from "./components/websocket/WebsocketComponent";


class App extends Component {

    constructor(props) {
        super(props);
    }


    //http://nael.io/2016-12-29-subdomains-with-express-and-react-router/
    //history={browserHistory}
    //https://stackoverflow.com/questions/37396427/how-to-bundle-a-react-app-to-a-subdirectory-on-a-server
    // basename='/coderuss-local-notes'
    render() {
        return (
            <Router
                // history={browserHistory}
            >

                <div>
                    <Navbar showDev={false}/>

                    <div>
                        <pre>
{JSON.stringify(EnvHelper.getProcessEnv(),null,' ')}
                        </pre>
                        {/*hello*/}
                        {/*<Route exact path="/" component={HomeComponent} />*/}
                    </div>


                    {<Route exact path="/" component={HomeComponent} />}

                    {<Route exact path="/notes" component={NotesComponent} />}
                    {<Route path="/kanban" component={KanbanComponent} />}
                    {<Route path="/profile" component={ProfileComponent} />}
                    {<Route path="/weather" component={WeatherComponent} />}
                    {<Route path="/tv" component={TVComponent} />}

                    {<Route exact path="/login" component={LoginComponent} />}

                    {<Route exact path="/grocery" component={GroceryComponent} />}


                    {<Route path="/steam" component={SteamComponent} />}
                    {<Route path="/example" component={ExampleComponent} />}

                    {<Route path="/ws" component={WebsocketComponent} />}

                </div>

            </Router>

        );
    }
}

export default App;
