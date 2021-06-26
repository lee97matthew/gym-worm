import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import * as serviceWorker from "./serviceWorker";


import Routes from './Routes';

ReactDOM.render(
    <Router forceRefresh={true}>
        <div className="App">
            <Routes/>
        </div>
    </Router>
    ,document.getElementById('root')
);

//serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
