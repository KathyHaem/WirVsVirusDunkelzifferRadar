""" Module holding all routes defined in ../app.yml """

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