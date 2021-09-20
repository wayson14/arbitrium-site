from logging import error
from flask import Flask, render_template, redirect, url_for, request
from flask_debugtoolbar import DebugToolbarExtension
import app.services.data_service as svc
import app.data.mongo_setup as mongo_setup

app = Flask(__name__)
app.debug = True

app.config.from_object(__name__)

initialize_database = True
def main():

    if initialize_database:
        mongo_setup.global_init()
        print('Initialized database.')

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        return render_template('index.html')

    app.run()