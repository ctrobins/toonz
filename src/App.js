import React from 'react';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Playlist from './components/Playlist.js';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

const App = props => (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Playlist}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </div>
    </BrowserRouter>
  );

export default App;
