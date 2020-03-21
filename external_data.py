import pandas as pd
import requests
from collections import defaultdict
import datetime as dt
from arcgis.features import Table
import psycopg2


def get_current_data(setup=False):
    data = _request_external_data()
    return data

def _request_external_data(date=None):
    if not date:
        date = dt.datetime.now().strftime('%Y-%m-%d')

    table = Table("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0")
    raw_data = table.query(where="Meldedatum<'{}'".format(date),
                           out_fields='Bundesland,Landkreis,Altersgruppe,Geschlecht,AnzahlFall,'
                                        'AnzahlTodesfall,Meldedatum')

    data = defaultdict(list)
    for object in raw_data.features:
        for k, v in object.attributes.items():
            if k == 'Meldedatum':
                v = dt.date.fromtimestamp(v//1000)
            data[k].append(v)


    return pd.DataFrame(data)

def _setup_database(cursor):
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
    cursor.execute('SELECT MAX(Meldedatum) FROM rki_covid19')
    return cursor.fetchone()[0]

def _get_current_entries(cursor):
    cursor.execute('SELECT ObjectId FROM rki_covid19')
    return [result[0] for result in cursor.fetchall()]

def _store_to_database(cursor, data):
    rows = data.to_dict(orient='records')
    existing_entries = _get_current_entries(cursor)
    for row in rows:
        if row['ObjectId'] not in existing_entries:
            meldedatum = dt.date.fromtimestamp(row['Meldedatum']//1000)
            cursor.execute('INSERT INTO rki_covid19 VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                           (row['ObjectId'], row['Bundesland'], row['Landkreis'],
                            row['Altersgruppe'], row['Geschlecht'], row['AnzahlFall'],
                            row['AnzahlTodesfall'], meldedatum))


