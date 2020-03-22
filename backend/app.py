""" Module containing basic connexion backend. """

import os

import connexion
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(".env")

from backend.routes import *

app = connexion.App(
    __name__, options={"swagger_ui": os.environ.get("SWAGGER_UI", False)}
)
CORS(app.app)
app.add_api("app.yml")
application = app.app

if __name__ == "__main__":
    app.run(port=8080, server="gevent")
