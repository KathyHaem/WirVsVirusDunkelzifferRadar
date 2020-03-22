import psycopg2
import os
import pandas as pd
import pandas.io.sql as sqlio

env_db = os.environ["database_hackathon"]
env_pw = os.environ["database_hackathon_pw"]


def get_database_table():
    """
    This function returns the rki_covid19 table from the (temporary dev
    database).
    """
    try:
        connection = psycopg2.connect(
            user="postgres",
            password=env_pw,
            host=env_db,
            port="5432",
            database="postgres",
        )
        cursor = connection.cursor()

        sql = """
                SELECT *
                FROM public.rki_covid19;
                """
        df = sqlio.read_sql_query(sql, connection)

    except:
        print("error while connection to database", error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("connection closed")
    return df
