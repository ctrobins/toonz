import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from '@material-ui/core/';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    componentDidMount() {
    }
    
    handleSearchClick() {
        axios.get(`/api/search/${this.state.query}`)
        .then(res => res.data.tracks.items) 
        .then(this.props.setTracks)
        .catch(console.log);
    }
    
    handleSearchInput(e) {
        this.setState({ query: e.target.value });
    }

    render() {
        return (<div style={{"backgroundColor": "white"}}>
            <TextField value={this.state.query} onChange={this.handleSearchInput} type="text"/>
            <button onClick={this.handleSearchClick}>
             Search
            </button></div>)
    }
}

export default Search;