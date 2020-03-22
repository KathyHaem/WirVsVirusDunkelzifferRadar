#from connection import get_database_table as get_table
#from connection import pd
from external_data import pd
from external_data import get_current_data

df_rki_covid19 = get_current_data()
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
