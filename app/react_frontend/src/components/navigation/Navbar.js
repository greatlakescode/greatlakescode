import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link, Redirect
} from 'react-router-dom'

export class Navbar extends React.Component {



    render() {

        console.log(`Navbar`,this.props);
        let devbar = <span></span>;
        devbar = '';
        if (this.props.showDev)
        {
            devbar =
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    In Dev
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/app/tv">TV</Link>

                    <div className="dropdown-divider"></div>
                    {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                    <Link className="dropdown-item" to="/app/blog">Blog</Link>
                    <Link className="dropdown-item" to="/app/filetmp">File Tmp</Link>
                    <Link className="dropdown-item" to="/app/dl">Download</Link>
                    <Link className="dropdown-item" to="/app/rx">Rx</Link>
                    <Link className="dropdown-item" to="/material">Material Demo</Link>
                    <Link className="dropdown-item" to="/app/adminlogs">
                        Admin Logs
                    </Link>
                    <Link className="dropdown-item" to="/app/logs">
                        Logs
                    </Link>

                        <Link className="dropdown-item" to="/example">example</Link>

                        <Link className="dropdown-item" to="/steam">steam</Link>

                        <Link className="dropdown-item" to="/grocery">grocery</Link>

                        <Link className="dropdown-item" to="/notes">Notes</Link>

                        <Link className="dropdown-item" to="/kanban">Kanban</Link>

                        <Link className="dropdown-item" to="/profile">Profile</Link>

                        <Link className="dropdown-item" to="/weather">Weather</Link>

                </div>
            </li>
        }
        else {
        }
        console.log(devbar);
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/app">Greatlakescode</Link>

                {/*<a  href="/">Coderuss</a>*/}
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        {devbar}

                        <li className="nav-item">
                            <Link className="nav-link" to="/tv">tv</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/app/logout">Logout</Link>

                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}
