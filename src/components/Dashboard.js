import React, { Component } from 'react';
import Track from './subcomponents/Track.js';
import Search from './subcomponents/Search.js';
import { Grid, Paper, TextField } from '@material-ui/core';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            playlists: [],
            currentPlaylist: { name: '', id: 0 },
            playlistTracks: [],
            searchResults: [],
            isPlaylistView: true,
            isCreatingPlaylist: false,
            newPlaylistName: ''
        };
        this.getPlaylists = this.getPlaylists.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);
        this.setTracks = this.setTracks.bind(this);
        this.showCreatePlaylist = this.showCreatePlaylist.bind(this);
        this.hideCreatePlaylist = this.hideCreatePlaylist.bind(this);
        this.handleNewPlaylistInput = this.handleNewPlaylistInput.bind(this);
        this.showPlaylist = this.showPlaylist.bind(this);
        this.showTracks = this.showTracks.bind(this);
        this.showSearchResults = this.showSearchResults.bind(this);
    }

    componentDidMount() {
        this.getPlaylists();
        this.getUserInfo();
    }

    getPlaylists() {
      axios.get(`/api/playlists`)
        .then(res => res.data.items) 
        .then(playlists => this.setState({ playlists }))
        .catch(console.log);
    }

    getUserInfo() {
      axios.get(`/api/userinfo`)
        .then(res => res.data.display_name)
        .then(username => this.setState({ username }))
        .catch(console.log);
    }

    addToPlaylist(track) {
      axios.post(`/api/addtoplaylist`, 
        { playlist: this.state.currentPlaylist.id, track: track.id })
        .then(() => this.showTracks(this.state.currentPlaylist))
        .catch(console.log);
    }

    removeFromPlaylist(track) {
        axios.post(`/api/removefromplaylist`, 
          { playlist: this.state.currentPlaylist.id, track: track.id })
          .then(() => this.showTracks(this.state.currentPlaylist))
          .catch(console.log);
      }

    createPlaylist() {
        axios.post(`/api/create`, 
        { name: this.state.newPlaylistName })
        .then(this.hideCreatePlaylist)
        .then(this.getPlaylists)
        .catch(console.log);
    }

    handleNewPlaylistInput(e) {
        this.setState({ newPlaylistName: e.target.value });
    }

    showCreatePlaylist() {
        this.setState({ isCreatingPlaylist: true });
    }

    hideCreatePlaylist() {
        this.setState({ isCreatingPlaylist: false });
    }

    setTracks(searchResults) {
        this.setState({ searchResults });
        this.showSearchResults();
    }

    showTracks(playlist) {
      this.setState({ currentPlaylist: playlist });
      axios.post(`/api/playlisttracks`, 
        { playlist_id: playlist.id })
        .then(res => res.data.tracks.items.map(track => track.track)) 
        .then(tracks => this.setState({ playlistTracks: tracks }))
        .then(() => this.setState({ isPlaylistView: true }))
        .catch(console.log);
    }

    showPlaylist() {
        this.setState({ isPlaylistView: true });
        this.showTracks(this.state.currentPlaylist)
    }

    showSearchResults() {
        this.setState({ isPlaylistView: false });
    }

    render() {
        return (
            <div>
            <div>
            <Grid style={{"backgroundColor":"darkBlue", "textAlign": "center"}} container spacing={40}>
                <Grid item xs={4} style={{"color":"white"}}><h1>Toonz</h1></Grid>
                <Grid item xs={4}>
                    <Search setTracks={this.setTracks}/>
                </Grid>
                <Grid item xs={4} style={{"color":"white"}}>
                    <h1>{this.state.username}</h1> 
                    <a href="/logout" style={{"textDecoration": "none","color":"white"}}><h4>LOG OUT</h4></a>
                </Grid>
            </Grid>
            <Grid container spacing={40}>
                <Grid item xs={4}>
                    <div style={{"textAlign": "center"}}>
                        <h2>My Playlists:</h2>
                        {this.state.isCreatingPlaylist 
                            ? <div><TextField value={this.state.newPlaylistName} onChange={this.handleNewPlaylistInput} placeholder="Name your playlist" type="text"/>
                                <span onClick={this.createPlaylist}><strong> + </strong></span>
                                <span onClick={this.hideCreatePlaylist}><strong> x </strong></span></div>
                            : <span onClick={this.showCreatePlaylist}>New Playlist</span>
                        }
                    </div>
                    <Paper>
                        <div style={{"width":"80%","margin":"auto"}}>
                        {this.state.playlists.map(playlist => {
                            return <p onClick={() => this.showTracks(playlist)}>{playlist.name}</p>
                        })}
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <div style={{"textAlign": "center"}}>
                        <h2 >{this.state.currentPlaylist.name}</h2>
                        <span onClick={this.showPlaylist} style={this.state.isPlaylistView ? { textDecoration: 'underline'} : null}>Current Playlist</span>
                        <span>  |  </span>
                        <span onClick={this.showSearchResults} style={this.state.isPlaylistView ? null : {textDecoration: 'underline'}}>Search Results</span>
                    </div>
                    <Paper>
                        {this.state.isPlaylistView 
                            ? this.state.playlistTracks.map(track => <Track track={track} removeFromPlaylist={this.removeFromPlaylist} isPlaylistView={this.state.isPlaylistView}/>)
                            : this.state.searchResults.map(track => <Track track={track} addToPlaylist={this.addToPlaylist} isPlaylistView={this.state.isPlaylistView}/>)
                        }
                    </Paper>
                </Grid>
            </Grid>
            </div>
                </div>)
    }
}

export default Dashboard;