from flask import Flask, session, request, redirect, render_template
import spotipy
import spotipy.util as util

app = Flask(__name__, static_folder='../build/static', template_folder='../build')
app.secret_key = 'RocketDollar'

CLIENT_ID='baa8b0e6a0cf4aaaa442b5b11a343660'
CLIENT_SECRET='10afa836a55c4df0a3187f75e518ae55'
REDIRECT_URI='http://localhost:5000/callback/'

def react_app():
    return render_template('index.html')

@app.route('/api/data')
def data():
    return session.get('token')

@app.route('/callback/')
def callback():
    auth_token = request.args['code']
    session['token'] = auth_token
    return redirect("/", code=302)

@app.route('/login', methods=['POST'])
def authenticate_user():
    username = request.json['username']
    util.prompt_for_user_token(username, 
        'user-library-read', 
        CLIENT_ID, 
        CLIENT_SECRET,
        REDIRECT_URI)
    return 'authenticated'

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
    if 'token' not in session:
        return redirect("/login", code=302)
    else:
        return react_app()

# Default case to rereoute other URLs to React Router
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def handle_route(path):
    return redirect('/', code=302)