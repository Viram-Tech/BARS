from pathlib import Path
import pandas as pd

xlsx = Path(r"C:\Users\LENOVO\.cache\kagglehub\datasets\shivsharantripathi\indian-accident-dataset-5lakh\versions\1\indian_accident_dataset_merged_5lakhs.xlsx")
print("reading", xlsx)
df = pd.read_excel(xlsx, engine="openpyxl")
print("rows", len(df))
print("cols", list(df.columns))
print(df.head(2).to_string())
print("---")
# normalize
cols = {c.lower().strip(): c for c in df.columns}
print("lower", list(cols))

def col(*names):
    for n in names:
        if n in cols:
            return cols[n]
        for k, orig in cols.items():
            if n in k:
                return orig
    return None

year_c = col("year")
sev_c = col("accident_severity", "severity")
state_c = col("state")
city_c = col("city")
road_c = col("road_type")
weather_c = col("weather")
cause_c = col("cause")
cas_c = col("casualties")
veh_c = col("vehicles_involved")
peak_c = col("is_peak_hour")
week_c = col("is_weekend")
risk_c = col("risk_score")

print("mapped", dict(year=year_c, sev=sev_c, state=state_c, city=city_c, road=road_c, weather=weather_c, cause=cause_c, cas=cas_c))

if year_c:
    print("years", df[year_c].value_counts().sort_index().to_dict())
if sev_c:
    print("severity", df[sev_c].value_counts().to_dict())
if weather_c:
    print("weather", df[weather_c].value_counts().head(12).to_dict())
if road_c:
    print("road", df[road_c].value_counts().to_dict())
if cause_c:
    print("cause", df[cause_c].value_counts().head(12).to_dict())
if state_c:
    print("states", df[state_c].value_counts().head(12).to_dict())
if city_c:
    print("cities", df[city_c].value_counts().head(12).to_dict())
if cas_c:
    print("casualties_sum", int(pd.to_numeric(df[cas_c], errors="coerce").fillna(0).sum()))
if peak_c:
    s = pd.to_numeric(df[peak_c], errors="coerce").fillna(0)
    print("peak_share", round(100*s.mean(), 1))
if week_c:
    s = pd.to_numeric(df[week_c], errors="coerce").fillna(0)
    print("weekend_share", round(100*s.mean(), 1))
if risk_c:
    print("mean_risk", round(pd.to_numeric(df[risk_c], errors="coerce").mean(), 3))
if year_c and cas_c:
    g = df.groupby(year_c).agg(accidents=(df.columns[0], "count"), casualties=(cas_c, "sum"))
    print("yearly", g.to_dict())
