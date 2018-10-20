from flask import Flask, session, redirect, render_template
app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app.secret_key = 'RocketDollar'

@app.route("/api/data")
def data():
    return "hello"

@app.route("/login")
def login():
    return render_template("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_app(path):
    if 'user' not in session:
        return redirect("/login", code=302)
    else:
        return render_template("index.html")
        