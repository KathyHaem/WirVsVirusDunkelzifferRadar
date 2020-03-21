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
    if body.get("corona_positive"):
        return (
            {
                "error": "He's dead Jim!"
            },
            400,
        )
    return {}, 200