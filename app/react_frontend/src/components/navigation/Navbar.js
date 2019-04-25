import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link, Redirect
} from 'react-router-dom'

export class Navbar extends React.Component {



    render() {

        if (!false)
        {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/app">Coderuss</Link>

                    {/*<a  href="/">Coderuss</a>*/}
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">


                            {/*<li className="nav-item active"> TODO set active links*/}
                                {/*<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                                {/*<a className="nav-link" href="#">Link</a>*/}
                            {/*</li>*/}

                            <li className="nav-item">
                                <Link className="nav-link" to="/example">example</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/steam">steam</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/grocery">grocery</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/notes">Notes</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/kanban">Kanban</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/weather">Weather</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/tv">tv</Link>
                            </li>

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
                                    {/*TODO only display for admin*/}
                                    {/*<li>*/}
                                        {/*<Link to="/app/test/input">*/}
                                            {/*Test Input*/}
                                        {/*</Link>*/}
                                    {/*</li>*/}
                                </div>
                            </li>
                            {/*<li className="nav-item">*/}
                                {/*<a className="nav-link disabled" href="#">Disabled</a>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/logout">Logout</Link>

                                {/*<a className="nav-link disabled" href="#">Disabled</a>*/}
                            </li>
                            {/*<li>*/}

                            {/*</li>*/}
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
        return (
            <div className="navbar">

                <ul>
                    <li>
                        <Link to="/app/logout">Logout</Link>
                    </li>
                    <li>
                        <Link to="/app/kanban">Kanban</Link>
                    </li>
                    <li>
                        <Link to="/app/tv">TV</Link>
                    </li>
                    <li>
                        <Link to="/app/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/app/filetmp">File Tmp</Link>
                    </li>
                    <li>
                        <Link to="/app/dl">Download</Link>
                    </li>
                    <li>
                        <Link to="/app/rx">Rx</Link>
                    </li>
                    <li>
                        <Link to="/material">Material Demo</Link>
                    </li>
                    <li>
                        <Link to="/app/adminlogs">
                            Admin Logs
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/logs">
                            Logs
                        </Link>
                    </li>
                    {/*TODO only display for admin*/}
                    <li>
                        <Link to="/app/test/input">
                            Test Input
                        </Link>
                    </li>
                </ul>
            </div>

        );
    }
}