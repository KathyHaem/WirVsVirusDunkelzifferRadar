import pandas as pd
import requests
from collections import defaultdict
import datetime as dt

#from arcgis.gis import GIS

#gis = GIS()

#landkreise = gis.content.search(query='title:RKI_Landkreisdaten', outside_org=True)
#print(landkreise)

def get_current_data():
    return _request_external_data()

def _request_external_data(date=None):
    if not date:
        date = dt.datetime.now().strftime('%Y-%m-%d')
    query = {'f': 'json',
             'where': "Meldedatum<'{}'".format(date),
             'returnGeometry': False,
             'spatialRel': 'esriSpatialRelIntersects',
             'outFields': 'Bundesland,Landkreis,Altersgruppe,Geschlecht,AnzahlFall,AnzahlTodesfall,'
                          'Meldedatum',
             'orderByFields': 'Meldedatum asc',
             'resultOffset': 0,
             'resultRecordCount': 20000,
             'cacheHint': True}
    r = requests.get(
        'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19'
        '/FeatureServer/0/query',
        params=query)

    raw_data = r.json()
    print(raw_data)
    data = defaultdict(list)
    for object in raw_data['features']:
        for k, v in object['attributes'].items():
            data[k].append(v)

    return pd.DataFrame(data)

#print(get_current_data().to_string())