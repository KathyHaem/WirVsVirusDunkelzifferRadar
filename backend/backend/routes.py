""" Module holding all routes defined in app.yml """

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
    if body.get("corona_positive"):
        return (
            {
                "error": "He's dead Jim!"
            },
            400,
        )
    return {}, 200

def get_chart(chart_id):
    """

    Args:
        body:

    Returns:

    """
    return {"chart_id": chart_id, "x":[1,2,3], "y":[2,4,8]}