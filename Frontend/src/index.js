import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';

import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';

ReactDOM.render(
    <Router>
        <div className="App">
            <Navbar />
            <Routes />
        </div>
    </Router>
    ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
