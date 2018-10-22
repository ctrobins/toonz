import React, { Component } from 'react';
import { Button, Paper, TextField } from '@material-ui/core/';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
    }
    
    handleSubmit() {
        axios.post(`/login`, { 'username': this.state.username })
        .catch(console.log);
    }
    
    handleTyping(e) {
        this.setState({ username: e.target.value });
    }

    render() {
        return (<div style={{"backgroundColor":"darkBlue"}}>
            <Paper style={{"width":"60%", "margin":"auto","height":700, "textAlign":"center"}}>
                <div>
                    <img src="https://rocketdollar.com/images/Rd-logo-vt-black.png" alt="Rocket Dollar" height="300" width="300"></img>
                </div>
                Please enter the username or email associated with your Spotify account.
                <div style={{"marginTop":15}}>
                    <TextField style={{"backgroundColor": "white", "marginLeft":20}} value={this.state.username} onChange={this.handleTyping} placeholder="hello@example.com" type="text"/>
                    <Button onClick={this.handleSubmit}>
                    Login
                    </Button>
                </div>
                <div style={{"marginTop":15}}>
                    <img src="https://newsroom.spotify.com/media/mediakit/2018-03-19_22-28-42/Spotify_Logo_CMYK_Black.png" alt="Rocket Dollar" height="120" width="400"></img>
                </div>
            </Paper>
            </div>
          )   
    }
}

export default Login;