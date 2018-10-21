import React, { Component } from 'react';
import axios from 'axios';
import spotifyApi from 'spotify-web-api-node';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
        this.spotify = new spotifyApi();
    }

    componentDidMount() {
        this.spotify.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
        .then(function(data) {
          console.log('Albums information', data.body);
        }, function(err) {
          console.error(err);
        });
    //   axios.get(`/api/data`)
    //     .then(res => res.data) 
    //     //.then(token => this.setState({ token }))
    //     .then(token => this.spotify.setAccessToken(token))
    //     .then(() => {
    //         this.spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    //             .then(console.log)
    //             .catch(console.log)
    //     })
    //     .catch(console.log);
    }

    render() {
        return <h1>My Token: {this.state.string}</h1>
    }
}

export default Playlist;