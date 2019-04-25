import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
// import UserMe from "./users/user-me";
// import AdminLogs from "./logs/admin-logs";
// import ServerInfo from "./server/server-info";
// import BlogCreate from "./blog/BlogCreate";

//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class HomeComponent extends Component {

    render() {
        return (
            <div>
                {/*<Debug data={this.props} />*/}

                <h1>Dashboard v1</h1>

                hello

                {/*<ServerInfo*/}
                {/*    serverDate={this.props.serverDate}*/}
                {/*/>*/}

                {/*<AdminLogs logs={this.props.adminLogs}/>*/}

                {/*<BlogCreate />*/}


                {/*/!*<h2>Server Info</h2>*!/*/}
                {/*/!*<span>*!/*/}
                {/*/!*Server Time: {DateHelper.getShortDate(this.props.serverDate)}*!/*/}
                {/*/!*</span>*!/*/}
                {/*/!*<h1>Logs</h1>*!/*/}

                {/*<UserMe/>*/}


                {/*/!*<YoutubeDownload/>*!/*/}

                {/*/!*<RxjsTest/>*!/*/}
                {/*/!*<VideoConvert/>*!/*/}

                {/*<h2>Notifications</h2>*/}


                {/*<AdminLogs logs={this.props.adminLogs}/>*/}


            </div>
        )
    }
}