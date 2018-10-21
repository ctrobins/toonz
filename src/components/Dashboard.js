import React, { Component } from 'react';
import Playlist from './Playlist.js';
import { AppBar, Drawer, Toolbar } from '@material-ui/core';
import dummyPlaylists from '../dummyData/playlists.json';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: dummyPlaylists.items
        };
    }

    componentDidMount() {
      axios.get(`/api/playlists`)
        .then(res => res.data.items) 
        .then(playlists => this.setState({ playlists }))
        .catch(console.log);
    }

    render() {
        return (
            <div>
                <AppBar>
                <Toolbar>
                toolbar
                </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    anchor="left"
                >
                    <h2>My Playlists:</h2>
                    hello
                    test
                    one
                    two 
                    three
                    </Drawer>
            </div>)
        // return <div>
        //     <h1>My Playlists:</h1>
        //     {this.state.playlists.map(playlist => {
        //         return <p>{playlist.name}</p>
        //     })}
        //     <h1>My Saved Tracks:</h1>
        //     <Playlist/>
        // </div>
    }
}

export default Dashboard;