import React, { Component } from 'react';
import Playlist from './subcomponents/Playlist.js';
import Track from './subcomponents/Track.js';
import Search from './subcomponents/Search.js';
import { AppBar, Drawer, Toolbar } from '@material-ui/core';
import dummyPlaylists from '../dummyData/playlists.json';
import dummyTracks from '../dummyData/savedTracks.json';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: dummyPlaylists.items,
            currentTracks: dummyTracks.items
        };
        this.setTracks = this.setTracks.bind(this);
    }

    componentDidMount() {
      axios.get(`/api/playlists`)
        .then(res => res.data.items) 
        .then(playlists => this.setState({ playlists }))
        .catch(console.log);
    }

    setTracks(currentTracks) {
        this.setState({ currentTracks });
    }

    showTracks(id) {
      axios.post(`/api/playlisttracks`, { 'playlist_id': id })
        .then(res => res.data.tracks.items.map(track => track.track)) 
        .then(tracks => this.setState({ currentTracks: tracks }))
        .catch(console.log);
    }

    render() {
        return (
            <div>
            <div>
            <AppBar>
            <Toolbar>
                <Search setTracks={this.setTracks}/>
            </Toolbar>
            </AppBar>
            </div>
            <h1>My Playlists:</h1>
            {this.state.playlists.map(playlist => {
                return <p onClick={() => this.showTracks(playlist.id)}>{playlist.name}</p>
            })}
                {this.state.currentTracks.map(track => <Track track={track}/>)}
                </div>)
                // return <div>
        //     <h1>My Saved Tracks:</h1>
        //     <Playlist/>
        // </div>
    }
}

export default Dashboard;