import React, { Component } from 'react';
import Login from './Login.js'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      string: ''
    };
  }

  componentDidMount() {
    axios.get(`/api/data`)
    .then(res => res.data.string) 
    .then(string => this.setState({ string }));
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.string}
          </p>
          <Route path="/login" component={Login}/>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
