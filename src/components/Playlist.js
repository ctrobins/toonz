import React, { Component } from 'react';
import axios from 'axios';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            string: ''
        };
    }

    componentDidMount() {
      axios.get(`/api/data`)
        .then(res => res.data) 
        .then(string => this.setState({ string }))
        .catch(console.log);
    }

    render() {
        return <h1>My Playlist:</h1>
    }
}

export default Playlist;