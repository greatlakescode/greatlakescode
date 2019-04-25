import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5

//https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
//https://medium.com/@bloodyowl/the-provider-and-higher-order-component-patterns-with-react-d16ab2d1636

// const AppContext = React.createContext();
// class AppProvider extends Component {
//     state = {
//         number : 10
//     }
//     render() {
//         return <AppContext.Provider value={this.state}>
//             {this.props.children}
//         </AppContext.Provider>
//     }
// }
//
// console.log('init environment',process.env,process.env.REACT_APP_ENV);
// if (process.env.REACT_APP_ENV === 'dev')
// {
//     console.log('init environment dev',process.env,process.env.REACT_APP_ENV);
//
//     process.env.REACT_APP_API = process.env.REACT_APP_API || 'http://localhost:8000';
//     process.env.REACT_APP_API = 123;
//         console.log('init environment dev',process.env.REACT_APP_API );
//
//
// }
// else if (process.env.REACT_APP_ENV === 'prod')
// {
//     process.env.REACT_APP_API = process.env.REACT_APP_API || 'http://localhost:8000'
// }
//
// console.log('end init environment',JSON.parse(JSON.stringify(process.env)));



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//
// console.log('settings',process.env);
//
//
//
//
// //https://reactjs.org/docs/context.html#when-to-use-context
// console.log('init environment',process.env,process.env.REACT_APP_ENV);
// if (process.env.REACT_APP_ENV === 'dev')
// {
//     console.log('init environment dev',process.env,process.env.REACT_APP_ENV);
//
//     process.env.REACT_APP_API = process.env.REACT_APP_API || 'http://localhost:8000';
//     process.env.REACT_APP_API = 123;
//     console.log('init environment dev',process.env.REACT_APP_API );
//
//
// }
// else if (process.env.REACT_APP_ENV === 'prod')
// {
//     process.env.REACT_APP_API = process.env.REACT_APP_API || 'http://localhost:8000'
// }
//
// console.log('end init environment',JSON.parse(JSON.stringify(process.env)));



// ./src/index.jsx
// import React, { Component } from 'react';
// // import { render } from 'react-dom';
// // import ReactDOM from 'react-dom';
// // import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// // Import routing components
// import {Router, Route} from 'react-router';
//
// class Home extends Component {
//     render(){
//         return (<h1>Hi</h1>);
//     }
// }
//
// ReactDOM.render(
//     <Router>
//         <!--Each route is defined with Route-->
//         <Route path="/" component={Home}/>
//     </Router>,
//     document.getElementById('container')
// );
// registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();



