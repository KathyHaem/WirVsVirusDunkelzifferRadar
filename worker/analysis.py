#from connection import get_database_table as get_table
#from connection import pd
from dotenv import load_dotenv
from external_data import pd, psycopg2, os
from external_data import (_get_data_from_database,
    _store_to_database_aggregated, _get_data_from_database_aggregated)

load_dotenv()
conn = psycopg2.connect(dbname=os.environ.get('DB_NAME'), user=os.environ.get('DB_USER'),
                        password=os.environ.get('DB_PASSWORD'), host=os.environ.get('DB_HOST'),
                        port=os.environ.get('DB_PORT'), sslcert=os.environ.get('DB_SSL_CERT'),
                        sslkey=os.environ.get('DB_SSL_KEY'))
cursor = conn.cursor()

"""
This implements the aggreagtion on landkreis niveau with respect to the
meldedatum
"""
#df_rki_covid19 = _get_data_from_database(cursor)
#df_rki_covid19.to_csv('data.csv', index=False)
#df_rki_covid19 = pd.read_csv("data.csv")
#df_rki_covid19 = (
#    df_rki_covid19.drop("ObjectId", axis=1)
#    .groupby(["Bundesland", "Landkreis", "Meldedatum"])
#    .sum()
#)
#df_rki_covid19.reset_index(inplace=True)
#print(
#    df_rki_covid19[
#        (df_rki_covid19.Bundesland == "Hessen")
#        & (df_rki_covid19.Landkreis == "SK Offenbach")
#    ]
#)

#_store_to_database_aggregated(df_rki_covid19, cursor)


df_rki_covid19_aggregated = _get_data_from_database_aggregated(cursor)
conn.commit()
cursor.close()
conn.close()

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime,timedelta
from scipy.optimize import curve_fit
from scipy.optimize import fsolve

def logistic_model(x,a,b,c):
    return c/(1+np.exp(-(x-b)/a))

def exponential_model(x,a,b,c):
    #return a*np.exp(b*(x-c))
    return a * b**(x+c)

df = df_rki_covid19_aggregated

df.MELDEDATUM = pd.to_datetime(df.MELDEDATUM)
df['tage'] = df.MELDEDATUM - df.MELDEDATUM.min()
land='Bayern'
df=df.groupby(['BUNDESLAND',
    'tage']).sum().loc[land].cumsum().resample('1d').ffill()
df = df.reset_index()
df.tage = df.tage / np.timedelta64(1, 'D')
x = np.linspace(0, len(df.tage), len(df.tage))
a = df.FALL_COUNT[0]
country_coef = [2.5,3,3.5]
time_delay   = np.arange(8,13,1)
growth_rate  = np.arange(1.15, 1.25, .01)
adam = np.zeros((len(country_coef), len(time_delay), len(growth_rate), len(df.tage)))
for c, coef in enumerate(country_coef):
    for t, days in enumerate(time_delay):
        for b, rate in enumerate(growth_rate):
            adam[c, t, b, :] = exponential_model(x, coef*a , rate, days)
bob = np.mean(adam, axis=(0,1,2))
lb = np.percentile(adam, .25, axis=(0,1,2))
ub = np.percentile(adam, .75, axis=(0,1,2))
