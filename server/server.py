from flask import Flask, render_template
app = Flask(__name__, static_folder="../build/static", template_folder="../build")


@app.route("/api/data")
def data():
    return "hello"

@app.route("/")
def react_app():
    return render_template("index.html")