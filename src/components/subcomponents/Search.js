import React, { Component } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core/';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
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
        return (<div style={{"marginTop":"30px"}}>
            <TextField style={{"backgroundColor": "white", "marginLeft":20}} value={this.state.query} onChange={this.handleSearchInput} placeholder="Find a song" type="text"/>
            <span style={{"color":"white"}}><Button onClick={this.handleSearchClick} color="inherit">
             Search
            </Button></span></div>)
    }
}

export default Search;