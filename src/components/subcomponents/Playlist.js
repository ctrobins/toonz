import React, { Component } from 'react';
import axios from 'axios';
import dummyTracks from '../../dummyData/savedTracks.json';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: dummyTracks.items.map(track => track.track)
        };
    }

    componentDidMount() {
      axios.get(`/api/savedtracks`)
        .then(res => res.data.items) 
        .then(tracks => tracks.map(track => track.track))
        .then(tracks => this.setState({ tracks }))
        .catch(console.log);
    }

    render() {
        return <div>
            {this.state.tracks.map((track, id) => {
                return <p>{track.name}</p>
            })}
        </div>
    }
}

export default Playlist;