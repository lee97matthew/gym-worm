import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
