from dotenv import load_dotenv
from external_data import pd, psycopg2, os
from external_data import (
    _get_data_from_database,
    _store_to_database_aggregated,
    _get_data_from_database_aggregated,
)



def aggregateTable(cursor):
    """
    This implements the aggreagtion on landkreis niveau with respect to the
    meldedatum
    """
    load_dotenv()
    conn = psycopg2.connect(
        dbname=os.environ.get("DB_NAME"),
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASSWORD"),
        host=os.environ.get("DB_HOST"),
        port=os.environ.get("DB_PORT"),
        sslcert=os.environ.get("DB_SSL_CERT"),
        sslkey=os.environ.get("DB_SSL_KEY"),
    )
    cursor = conn.cursor()
    df_rki_covid19 = _get_data_from_database(cursor)
    df_rki_covid19 = (
        df_rki_covid19.drop("ObjectId", axis=1)
        .groupby(["Bundesland", "Landkreis", "Meldedatum"])
        .sum()
    )
    df_rki_covid19.reset_index(inplace=True)
    _store_to_database_aggregated(aggregateTable(cursor), cursor)
    cursor.close()
    conn.close()

def getAggregatedTable():
    load_dotenv()
    conn = psycopg2.connect(
        dbname=os.environ.get("DB_NAME"),
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASSWORD"),
        host=os.environ.get("DB_HOST"),
        port=os.environ.get("DB_PORT"),
        sslcert=os.environ.get("DB_SSL_CERT"),
        sslkey=os.environ.get("DB_SSL_KEY"),
    )
    cursor = conn.cursor()
    df = _get_data_from_database_aggregated(cursor)
    cursor.close()
    conn.close()
    return  df
