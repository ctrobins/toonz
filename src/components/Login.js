import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          string: ''
        };
    }

    render() {
        return <h1>Please log in. <a href="/signup">Sign Up</a></h1>
    }
}

export default Login;