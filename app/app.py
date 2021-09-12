from logging import error
from flask import Flask, render_template, redirect, url_for, request
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.debug = True

app.config.from_object(__name__)

def main():

    @app.route("/")
    def index():
        return render_template('index.html')

    app.run()