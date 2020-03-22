import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from scipy.optimize import curve_fit
from scipy.optimize import fsolve
from landkreisAggregate import getAggregatedTable

# Model definition
def logistic_model(x, a, b, c):
    return c / (1 + np.exp(-(x - b) / a))


def exponential_model(x, a, b, c):
    # return a*np.exp(b*(x-c))
    return a * b ** (x + c)


def get_dunkelziffer_bundesland(df_rki_covid19_aggregated, bundesland):
    first_day = df_rki_covid19_aggregated.MELDEDATUM.min()
    
    df_rki_covid19_aggregated = (
        df_rki_covid19_aggregated.groupby(["BUNDESLAND", "tage"])
        .sum()
        .loc[bundesland]
        .cumsum()
        .resample("1d")
        .ffill()
    )

    df_rki_covid19_aggregated = df_rki_covid19_aggregated.reset_index()
    
    backup_date = first_day + df_rki_covid19_aggregated.tage
    
    df_rki_covid19_aggregated.tage = (
        df_rki_covid19_aggregated.tage / np.timedelta64(1, "D")
    )

    # Creating "predictions"
    x = np.linspace(
        0, len(df_rki_covid19_aggregated.tage), len(df_rki_covid19_aggregated.tage)
    )
    a = df_rki_covid19_aggregated.FALL_COUNT[0]
    country_coef = [2.5, 3, 3.5]
    time_delay = np.arange(8, 13, 1)
    growth_rate = np.arange(1.15, 1.20, 0.01)

    adam = np.zeros(
        (
            len(country_coef),
            len(time_delay),
            len(growth_rate),
            len(df_rki_covid19_aggregated.tage),
        )
    )

    for c, coef in enumerate(country_coef):
        for t, days in enumerate(time_delay):
            for b, rate in enumerate(growth_rate):
                adam[c, t, b, :] = exponential_model(x, coef * a, rate, days)
    
    bob = np.mean(adam, axis=(0, 1, 2))
    return list(zip(backup_date, bob))


def get_dunkelziffer_landkreis(df_rki_covid19_aggregated, landkreis):
    first_day = df_rki_covid19_aggregated.MELDEDATUM.min()
    
    df_rki_covid19_aggregated = (
        df_rki_covid19_aggregated.groupby(["LANDKREIS", "tage"])
        .sum()
        .loc[landkreis]
        .cumsum()
        .resample("1d")
        .ffill()
    )

    df_rki_covid19_aggregated = df_rki_covid19_aggregated.reset_index()
    
    backup_date = first_day + df_rki_covid19_aggregated.tage
    
    df_rki_covid19_aggregated.tage = (
        df_rki_covid19_aggregated.tage / np.timedelta64(1, "D")
    )

    # Creating "predictions"
    x = np.linspace(
        0, len(df_rki_covid19_aggregated.tage), len(df_rki_covid19_aggregated.tage)
    )
    a = df_rki_covid19_aggregated.FALL_COUNT[0]
    country_coef = [2.5, 3, 3.5]
    time_delay = np.arange(8, 13, 1)
    growth_rate = np.arange(1.15, 1.20, 0.01)

    adam = np.zeros(
        (
            len(country_coef),
            len(time_delay),
            len(growth_rate),
            len(df_rki_covid19_aggregated.tage),
        )
    )

    for c, coef in enumerate(country_coef):
        for t, days in enumerate(time_delay):
            for b, rate in enumerate(growth_rate):
                adam[c, t, b, :] = exponential_model(x, coef * a, rate, days)
    
    bob = np.mean(adam, axis=(0, 1, 2))
    return list(zip(backup_date, bob))

# Loading Dataframe
df_rki_covid19_aggregated = getAggregatedTable()
df_rki_covid19_aggregated=df_rki_covid19_aggregated[df_rki_covid19_aggregated.BUNDESLAND!='-nicht erhoben-']
df_rki_covid19_aggregated=df_rki_covid19_aggregated[df_rki_covid19_aggregated.LANDKREIS !='-nicht erhoben-']

# Dataframe manipulations
df_rki_covid19_aggregated.MELDEDATUM = pd.to_datetime(
    df_rki_covid19_aggregated.MELDEDATUM
)

df_rki_covid19_aggregated["tage"] = (
    df_rki_covid19_aggregated.MELDEDATUM
    - df_rki_covid19_aggregated.MELDEDATUM.min()
)

for land in np.unique(df_rki_covid19_aggregated.BUNDESLAND.values):
    dictionary = get_dunkelziffer_bundesland(df_rki_covid19_aggregated, land)
    print(dictionary)
    #to do
    #function to push to datenbank
    
for kreis in np.unique(df_rki_covid19_aggregated.LANDKREIS.values):
    dictionary = get_dunkelziffer_landkreis(df_rki_covid19_aggregated, kreis)
    print(dictionary)
    #to do
    #function to push to datenbank

    
