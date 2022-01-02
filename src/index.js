import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import Admin from './Admin';
import Posts from './Posts';
import About from './About';
import Downloads from './Downloads.js';
import More from './More';

import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import Curve from './components/Curve';

// import bigA from './assets/bigA.svg'
ReactDOM.render(
  
  <React.StrictMode>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
    <Router>  
      <Navbar></Navbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="content">
          <Curve/>
          <Routes>
            <Route path="/" element={<Posts />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/downloads" element={<Downloads />}/>
            <Route path="/more" element={<More />}/>
            <Route path="/admin" element={<Admin />}/>
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


