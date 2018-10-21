from flask import Flask, session, jsonify, request, redirect, render_template
from datetime import timedelta
import spotipy
import spotipy.oauth2 as oauth2
import spotipy.util as util

app = Flask(__name__, static_folder='../build/static', template_folder='../build')
app.secret_key = 'RocketDollar'
# Account for expiration of Spotify tokens
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=60)

SCOPE='playlist-modify-public playlist-modify-private playlist-read-private user-top-read user-library-read'
CLIENT_ID='baa8b0e6a0cf4aaaa442b5b11a343660'
CLIENT_SECRET='10afa836a55c4df0a3187f75e518ae55'
REDIRECT_URI='http://localhost:5000/callback/'

def react_app():
    return render_template('index.html')

@app.route('/api/search/<query>')
def search_spotify(query):
    sp = spotipy.Spotify(session.get('token'))
    return jsonify(sp.search(q=query, type='track'))

@app.route('/api/savedtracks')
def saved_tracks():
    sp = spotipy.Spotify(session.get('token'))
    return jsonify(sp.current_user_saved_tracks())

@app.route('/api/playlists')
def playlists():
    sp = spotipy.Spotify(session.get('token'))
    return jsonify(sp.current_user_playlists())

@app.route('/api/playlisttracks', methods=['POST'])
def playlist_tracks():
    playlist_id = request.json['playlist_id']
    username = session.get('username')
    sp = spotipy.Spotify(session.get('token'))
    return jsonify(sp.user_playlist(username, playlist_id, fields="tracks,next"))

@app.route('/api/userinfo')
def user_info():
    sp = spotipy.Spotify(session.get('token'))
    return jsonify(sp.current_user())
  
@app.route('/login', methods=['POST'])
def authenticate_user():
    username = request.json['username']
    session['username'] = username
    return util.prompt_for_user_token(username, 
        SCOPE,
        CLIENT_ID, 
        CLIENT_SECRET,
        REDIRECT_URI)

@app.route('/callback/')
def callback():
    sp_oauth = oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPE)
    code = sp_oauth.parse_response_code(request.url)
    token_info = sp_oauth.get_access_token(code)
    session['token'] = token_info['access_token']
    session.permanent = True
    return redirect('/', code=302)

@app.route('/logout')
def logout_user():
    session.clear()
    return redirect('/login', code=302)

# Screen toggling handled by React Router
@app.route('/login', methods=['GET'])
def login_screen():
    return react_app()

# Only let users access the main page if they are authenticated
@app.route('/')
def check_auth():
    if 'token' not in session:
        return redirect('/login', code=302)
#     elif: 
    else:
        return react_app()

# Default case to rereoute other URLs to React Router
@app.route('/<path>')
def handle_route(path):
    return redirect('/', code=302)