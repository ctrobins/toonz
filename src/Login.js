import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          string: ''
        };
      }

    render() {
        return <h1>Please log in.</h1>
    }
}

export default Login;