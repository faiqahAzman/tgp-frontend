import pandas as pd
import re

# Load the WDI data
file_path = r"C:\Users\user\Downloads\Paynet Case Study\backend\uncleaned_excel_sheet\WDIEXCEL.xlsx"
wdi_df = pd.read_excel(file_path, sheet_name=0)

# Display basic info before cleaning
print("Before Cleaning:")
print(wdi_df.info())
print(wdi_df.head())

# Drop duplicate rows
wdi_df = wdi_df.drop_duplicates()

# Fill missing values with 0 (or use forward-fill for time-series data)
wdi_df = wdi_df.fillna(0)

# Handle missing values in important columns
wdi_df = wdi_df.dropna(subset=['Country Name', 'Indicator Name'])

# Rename columns for clarity
wdi_df.rename(columns={'Country Name': 'Country', 'Indicator Name': 'Indicator'}, inplace=True)

# Convert column names to string to avoid issues with numeric year columns
wdi_df.columns = wdi_df.columns.astype(str)

# Define a function to shorten indicator names dynamically
def shorten_indicator(indicator):
    replacements = {
        "Unemployment": "UE",
        "with advanced education": "Adv Edu",
        "with basic education": "Basic Edu",
        "with intermediate education": "Interm Edu",
        "female": "F",
        "male": "M",
        "total": "Total",
        "(modeled ILO estimate)": "(ILO)",
        "(national estimate)": "(Nat)",
        "youth": "Youth",
        "(% of total labor force)": "",
        "(% of female labor force)": "",
        "(% of male labor force)": "",
        "(% of population ages 15+)": "",
        "(% of labor force ages 15-24)": ""
    }
    for long, short in replacements.items():
        indicator = indicator.replace(long, short).strip()
    return indicator

# Apply the function to create short indicator names
wdi_df['Short Indicator'] = wdi_df['Indicator'].apply(shorten_indicator)

# Get the last 10 years dynamically
year_columns = [col for col in wdi_df.columns if col.isdigit()]  # Identify year columns
latest_years = sorted(map(int, year_columns))[-10:]  # Keep only the latest 10 years
latest_years = list(map(str, latest_years))  # Convert back to string for selection

# Keep only relevant columns
columns_to_keep = ['Country', 'Country Code', 'Indicator', 'Short Indicator', 'Indicator Code'] + latest_years
wdi_df = wdi_df[columns_to_keep]

# Drop rows where all selected years are missing (optional)
wdi_df.dropna(subset=latest_years, how='all', inplace=True)

# Reset index
wdi_df.reset_index(drop=True, inplace=True)

# Save the cleaned data
wdi_df.to_csv("Cleaned_WDIEXCEL.csv", index=False)

print("WDI data cleaning completed. Cleaned file is saved as 'Cleaned_WDIEXCEL.csv'.")
