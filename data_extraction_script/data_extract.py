import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, String, Float, Integer

excel_file = './egrid2022_data.xlsx'

xl = pd.ExcelFile(excel_file)
sheet_names = xl.sheet_names

plants_info = pd.read_excel(excel_file, sheet_name=3, skiprows=[1])
state_info = pd.read_excel(excel_file, sheet_name=4, skiprows=[1])

# Extract required columns
plants_info_req_data = plants_info[["Plant name", "Plant state abbreviation", "Plant annual net generation (MWh)", "Plant latitude", "Plant longitude"]]
state_info_req_data = state_info[["State abbreviation", "State annual net generation (MWh)"]]


db_string = 'postgresql://apple@localhost/challenge1'

engine = create_engine(db_string)

metadata = MetaData()

# Define plants_info table
plants_info_table = Table('plants_info', metadata,
                          Column('id', Integer, primary_key=True),
                          Column('Plant name', String),
                          Column('Plant state abbreviation', String),
                          Column('Plant annual net generation (MWh)', Float),
                          Column('Plant latitude', Float),
                          Column('Plant longitude', Float)
                          )

# Define state_info table
state_info_table = Table('state_info', metadata,
                         Column('id', Integer, primary_key=True),
                         Column('State abbreviation', String),
                         Column('State annual net generation (MWh)', Float)
                         )

# Create tables in the database if they do not exist
metadata.create_all(engine)

# Insert data into tables
conn = engine.connect()

plants_info_records = plants_info_req_data.to_dict(orient='records')
print(state_info_req_data)

conn.execute(plants_info_table.insert(), plants_info_records)

state_info_records = state_info_req_data.to_dict(orient='records')
conn.execute(state_info_table.insert(), state_info_records)

conn.close()

print("Data successfully imported into database tables.")
