#from connection import get_database_table as get_table
#from connection import pd
from dotenv import load_dotenv
from external_data import pd, psycopg2, os
from external_data import _get_data_from_database, _store_to_database_aggregated

load_dotenv()
conn = psycopg2.connect(dbname=os.environ.get('DB_NAME'), user=os.environ.get('DB_USER'),
                        password=os.environ.get('DB_PASSWORD'), host=os.environ.get('DB_HOST'),
                        port=os.environ.get('DB_PORT'), sslcert=os.environ.get('DB_SSL_CERT'),
                        sslkey=os.environ.get('DB_SSL_KEY'))
cursor = conn.cursor()

df_rki_covid19 = _get_data_from_database(cursor)
#df_rki_covid19.to_csv('data.csv', index=False)

#df_rki_covid19 = pd.read_csv("data.csv")

"""
This implements the aggreagtion on landkreis niveau with respect to the
meldedatum
"""
print(df_rki_covid19.head())
df_rki_covid19 = (
    df_rki_covid19.drop("ObjectId", axis=1)
    .groupby(["Bundesland", "Landkreis", "Meldedatum"])
    .sum()
)
df_rki_covid19.reset_index(inplace=True)
print(
    df_rki_covid19[
        (df_rki_covid19.Bundesland == "Hessen")
        & (df_rki_covid19.Landkreis == "SK Offenbach")
    ]
)

_store_to_database_aggregated(df_rki_covid19, cursor)

conn.close()

