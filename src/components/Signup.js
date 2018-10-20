import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          string: ''
        };
      }

    render() {
        return <h1>Please sign up. <a href="/login">Log in</a></h1>
    }
}

export default Signup;