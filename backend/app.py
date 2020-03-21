""" Module containing basic connexion backend. """

import os

import connexion
from dotenv import load_dotenv
from flask_cors import CORS

from backend.routes import hello_world, add_questionnaire_entry

load_dotenv()

app = connexion.App(
    __name__, options={"swagger_ui": os.environ.get("SWAGGER_UI", False)}
)
CORS(app.app)
app.add_api(
    "app.yml",
    # strict_validation=True,
    # validate_responses=True,
    # validator_map={"body": None},
)
application = app.app

if __name__ == "__main__":
    app.run(port=8080, server="gevent")
