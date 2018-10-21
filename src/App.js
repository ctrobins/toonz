import React from 'react';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Dashboard from './components/Dashboard.js';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

const App = props => (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </div>
    </BrowserRouter>
  );

export default App;
