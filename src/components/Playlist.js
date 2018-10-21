import React, { Component } from 'react';
import axios from 'axios';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    componentDidMount() {
      axios.get(`/api/data`)
        .then(res => res.data) 
        .then(token => this.setState({ token }))
        .catch(console.log);
    }

    render() {
        return <h1>My Token: {this.state.string}</h1>
    }
}

export default Playlist;