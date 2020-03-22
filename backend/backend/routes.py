""" Module holding all routes defined in app.yml """
import os
import datetime as dt

from .db_connector import DBConnector

DB = DBConnector(db_name=os.environ.get('DB_NAME'), db_user=os.environ.get('DB_USER'),
                 db_password=os.environ.get('DB_PASSWORD'), db_host=os.environ.get('DB_HOST'),
                 db_port=os.environ.get('DB_PORT'), db_ssl_cert=os.environ.get('DB_SSL_CERT'),
                 db_ssl_key=os.environ.get('DB_SSL_KEY'))


def hello_world():
    """
    Returns mock data.

    Returns:
        dict: mock data.
    """
    return {
        "test_id": 1,
        "message": "hello world"
    }


def add_questionnaire_entry(body):
    """
    Add Questionnaire entry to database.

    Args:
        body (dict): Content of questionnaire sent by frontend.

    Returns:
        tuple: status message.
    """
    if body:
        body["entry_date"] = dt.datetime.today().isoformat()
        if "other_illnes" in body:
            body["other_illness"] = body["other_illnes"]
            del body["other_illnes"]
        if "corona_date" in body:
            body['corona_date'] = dt.datetime.fromisoformat(body['corona_date'])
        DB.insert_row(body)
    else:
        return {"error": "no questionnaire body"}, 400
    return {}, 200


def get_chart(chart_id):
    """

    Args:
        chart_id (int): id of requested chart

    Returns:
        dict: data for specified chart
    """
    return {"chart_id": chart_id, "x": [1, 2, 3], "y": [2, 4, 8]}
