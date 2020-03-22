import pandas as pd
import requests
from collections import defaultdict
import datetime as dt
from arcgis.features import Table
import psycopg2
import os
from dotenv import load_dotenv


def get_current_data(setup=False):
    """
    Retrieves the current data about the COVID-19 case numbers published by the Robert Koch
    Institut. The data contains information about the federal state, county, age group, sex,
    number of cases, number of deaths, and the report date for each entry. Entries are grouped by
    (county, age group, sex, report date). The data is stored in a PostgreSQL database.

    :param setup: bool: Whether to create a new database table or use an existing one.
    :return: pandas.DataFrame: Full updated table
    """
    load_dotenv()
    conn = psycopg2.connect(dbname=os.environ.get('DB_NAME'), user=os.environ.get('DB_USER'),
                            password=os.environ.get('DB_PASSWORD'), host=os.environ.get('DB_HOST'),
                            port=os.environ.get('DB_PORT'), sslcert=os.environ.get('DB_SSL_CERT'),
                            sslkey=os.environ.get('DB_SSL_KEY'))
    cursor = conn.cursor()
    if setup:
        _setup_table(cursor)
        full_data = _request_external_data()
        _store_to_database(cursor, full_data)
    else:
        last_report_date = _get_last_report_date(cursor)
        if dt.date.today() > last_report_date:
            data = _request_external_data(last_report_date)
            _store_to_database(cursor, data)
        full_data = _get_data_from_database(cursor)
    conn.commit()
    cursor.close()
    conn.close()
    return full_data


def _request_external_data(last_date=None):
    """
    Requests the external data from ArcGis. If a last report date is given, only the cases
    reported on the same day or after are retrieved. Otherwise, all data is requested.

    :param last_date: datetime.date or None: Last report date stored in the database
    :return: pandas.DataFrame: Retrieved data
    """
    if not last_date:
        today = dt.datetime.now().strftime('%Y-%m-%d')
        where_clause = "Meldedatum<='{}'".format(today)
    else:
        where_clause = "Meldedatum>='{}'".format(last_date)

    table = Table("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0")
    raw_data = table.query(where=where_clause,
                           out_fields='Bundesland,Landkreis,Altersgruppe,Geschlecht,AnzahlFall,'
                                        'AnzahlTodesfall,Meldedatum')

    data = defaultdict(list)
    for object in raw_data.features:
        for k, v in object.attributes.items():
            if k == 'Meldedatum':
                v = dt.date.fromtimestamp(v//1000)
            data[k].append(v)


    return pd.DataFrame(data)


def _setup_table(cursor):
    """
    Creates a new rki_covid19 table.

    :param cursor: psycopg2.cursor: cursor handling the database operations
    :return: None
    """
    cursor.execute('CREATE TABLE rki_covid19 ('
                   'ObjectId integer PRIMARY KEY, '
                   'Bundesland varchar, '
                   'Landkreis varchar, '
                   'Altersgruppe varchar, '
                   'Geschlecht varchar, '
                   'AnzahlFall integer, '
                   'AnzahlTodesfall integer, '
                   'Meldedatum date);')


def _get_last_report_date(cursor):
    """
    Returns the last report date stored in the database.

    :param cursor: psycopg2.cursor: cursor handling the database operations
    :return: datetime.date: last report date
    """
    cursor.execute('SELECT MAX(Meldedatum) FROM rki_covid19')
    return cursor.fetchone()[0]


def _get_current_entries(cursor):
    """
    Returns the IDs of all entries in the database.

    :param cursor: psycopg2.cursor: cursor handling the database operations
    :return: list: collection of IDs
    """
    cursor.execute('SELECT ObjectId FROM rki_covid19')
    return [result[0] for result in cursor.fetchall()]


def _get_data_from_database(cursor):
    """
    Returns the complete rki_covid19 table from the database as data frame.

    :param cursor: psycopg2.cursor: cursor handling the database operations
    :return: pandas.DataFrame: complete table
    """
    cursor.execute('SELECT * FROM rki_covid19')
    data = cursor.fetchall()
    columns = ['ObjectId', 'Bundesland', 'Landkreis', 'Altersgruppe', 'Geschlecht', 'AnzahlFall',
               'AnzahlTodesfall', 'Meldedatum']
    return pd.DataFrame(data, columns=columns)


def _store_to_database(cursor, data):
    """
    Stores new cases to the database.

    :param cursor: psycopg2.cursor: cursor handling the database operations
    :param data: pandas.DataFrame: new cases
    :return: None
    """
    rows = data.to_dict(orient='records')
    if rows:
        existing_entries = _get_current_entries(cursor)
        for row in rows:
            if row['ObjectId'] not in existing_entries:
                cursor.execute('INSERT INTO rki_covid19 VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                               (row['ObjectId'], row['Bundesland'], row['Landkreis'],
                                row['Altersgruppe'], row['Geschlecht'], row['AnzahlFall'],
                                row['AnzahlTodesfall'], row['Meldedatum']))


if __name__=='__main__':
    print(get_current_data(setup=False))
