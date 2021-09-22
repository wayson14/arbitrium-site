from logging import error
from flask import Flask, render_template, redirect, url_for, request, jsonify, make_response
from flask_debugtoolbar import DebugToolbarExtension
from flask_restful import Api, Resource, reqparse
import traceback
import json
from bson import ObjectId
import datetime
import app.services.data_service as svc
import app.data.mongo_setup as mongo_setup



########################################
### CONFIGURATION AND INITIALIZATION ###
########################################
app = Flask(__name__)
app.debug = True
app.config.from_object(__name__)

api = Api(app)

initialize_database = True
initialize_api = True




###########
### API ###
###########
class Post(Resource):
        

    def get(self, idx=0):
        try:
            response = {
                "post" : [],
            }
            post = svc.get_post_by_index(idx)
            for field in post:
                pair = {field: str(post[field])}
                response["post"].append(pair)
                
        except Exception as err:
            return f"Error: {traceback.format_exc}", 500
        return make_response(jsonify(response), 200)

    def post(self):
        return "Not implemented yet!", 501
    
    def put(self):
        return "Not implemented yet!", 501

    def delete(self):
        return "Not implemented yet!", 501





############
### SITE ###
############
def main():
    if initialize_database:
        mongo_setup.global_init()
        print('Initialized database.')
    if initialize_api:
        api.add_resource(Post, "/api/posts", "/api/posts/", "/api/posts/<int:idx>")
        print('Initialized API.')
    

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        return render_template('index.html')

    app.run()




if __name__ == "__main__":
    main()