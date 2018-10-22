import React from 'react';

const Track = props => (
    <p>
    <strong>{Array.isArray(props.track.artists) ? props.track.artists[0].name : null} - </strong>
    {props.track.name} 
    {props.isPlaylistView 
        ? <strong onClick={() => props.removeFromPlaylist(props.track)}> x</strong>
        : <strong onClick={() => props.addToPlaylist(props.track)}> +</strong>
    }</p>
  );

export default Track;