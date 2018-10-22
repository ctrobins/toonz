import React from 'react';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import { BrowserRouter, Route } from 'react-router-dom';

const App = props => (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/login" component={Login}/>
      </div>
    </BrowserRouter>
  );

export default App;
