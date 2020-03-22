from connection import get_database_table as get_table
from connection import pd

# df_rki_covid19 = get_table()
# df_rki_covid19.to_csv('data.csv', index=False)

df_rki_covid19 = pd.read_csv("data.csv")

"""
This implements the aggreagtion on landkreis niveau with respect to the
meldedatum
"""
df_rki_covid19 = (
    df_rki_covid19.drop("objectid", axis=1)
    .groupby(["bundesland", "landkreis", "meldedatum"])
    .sum()
)
df_rki_covid19.reset_index(inplace=True)
print(
    df_rki_covid19[
        (df_rki_covid19.bundesland == "Hessen")
        & (df_rki_covid19.landkreis == "SK Offenbach")
    ]
)
