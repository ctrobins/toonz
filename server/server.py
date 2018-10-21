from flask import Flask, session, request, redirect, render_template
import spotipy
import spotipy.oauth2 as oauth2
import spotipy.util as util

app = Flask(__name__, static_folder='../build/static', template_folder='../build')
app.secret_key = 'RocketDollar'

SCOPE='playlist-modify-public playlist-modify-private playlist-read-private user-top-read user-library-read'
CLIENT_ID='baa8b0e6a0cf4aaaa442b5b11a343660'
CLIENT_SECRET='10afa836a55c4df0a3187f75e518ae55'
REDIRECT_URI='http://localhost:5000/callback/'

def react_app():
    return render_template('index.html')

@app.route('/api/data')
def data():
   return 'hello'

@app.route('/callback/')
def callback():
    url = request.url
    sp_oauth = oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPE)
    code = sp_oauth.parse_response_code(url)
    token_info = sp_oauth.get_access_token(code)
    session['token'] = token_info['access_token']
    return redirect("/", code=302)

@app.route('/login', methods=['POST'])
def authenticate_user():
    username = request.json['username']
    token = util.prompt_for_user_token(username, 
        SCOPE,
        CLIENT_ID, 
        CLIENT_SECRET,
        REDIRECT_URI)
    session['token'] = token
    return redirect("/", code=302)

@app.route('/logout')
def logout_user():
    session.clear()
    return redirect("/login", code=302)

# Screen toggling handled by React Router
@app.route('/login', methods=['GET'])
def login_screen():
    return react_app()

@app.route('/signup', methods=['GET'])
def signup_screen():
    return react_app()

@app.route('/')
def check_auth():
        #session.clear()
        for el in session:
                print(el)
        if 'token' not in session:
                return redirect("/login", code=302)
        else:
                print('TOKEN', session.get('token'))
                sp = spotipy.Spotify(session.get('token'))
                sp.trace = False
                results = sp.current_user_saved_tracks()
                for item in results['items']:
                        track = item['track']
                        print track['name'] + ' - ' + track['artists'][0]['name']
                return react_app()

# Default case to rereoute other URLs to React Router
@app.route('/<path>')
def handle_route(path):
    return redirect('/', code=302)