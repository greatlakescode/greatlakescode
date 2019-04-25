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


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router
                // history={browserHistory}
            >

                <div>

                    <div>
                    </div>


                    {<Route exact path="/" component={HomeComponent} />}


                </div>

            </Router>

        );
    }
}

export default App;
