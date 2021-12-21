import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import Admin from './Admin';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="main container">
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/admin" element={<Admin />}/>
        </Routes>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


