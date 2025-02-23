import pandas as pd

# Load the FINDEX dataset
file_path = r"C:\Users\user\Downloads\Paynet Case Study\backend\uncleaned_excel_sheet\FINDEXEXCEL.xlsx"
findex_df = pd.read_excel(file_path, sheet_name=0)

# Display first few rows before processing
print("Before Cleaning:")
print(findex_df.info())
print(findex_df.head())

# Drop duplicate rows
findex_df = findex_df.drop_duplicates()

# Fill missing values with 0 (or use forward-fill for time-series data)
findex_df = findex_df.fillna(0)

# 🔹 Rename columns for clarity
findex_df.rename(columns={'Country Name': 'Country', 'Indicator Name': 'Indicator'}, inplace=True)

# Function to generate short indicators
def generate_short_indicator(indicator):
    if not isinstance(indicator, str):
        return "Unknown"  # Handle cases where the indicator is not a string

    indicator = indicator.lower()

    # Custom mapping for specific indicators
    short_forms = {
        "sent or received domestic remittances (% age 15+)": "Domestic Remittances (% 15+)",
        "account ownership at a financial institution or with a mobile-money-service provider (% age 15+)": "Account Ownership (% 15+)",
        "borrowed from a financial institution or used a credit card (% age 15+)": "Formal Borrowing (% 15+)",
        "saved at a financial institution (% age 15+)": "Formal Savings (% 15+)",
        "made or received digital payments in the past year (% age 15+)": "Digital Payments (% 15+)"
    }

    # Check if the indicator is in the predefined mapping
    if indicator in short_forms:
        return short_forms[indicator]

    # General rule: Keep main keywords and abbreviate common terms
    words = indicator.split()
    short_indicator = " ".join(words[:4])  # Take the first three words as a default
    
    return short_indicator

# Apply the short indicator function
findex_df["Short Indicator"] = findex_df["Indicator"].apply(generate_short_indicator)

# 🔹 Select relevant columns
selected_columns = ["Country", "Country Code", "Indicator", "Short Indicator", "2011", "2014", "2017", "2021", "2022"]
selected_columns = [col for col in selected_columns if col in findex_df.columns]  # Ensure only existing columns are selected
findex_df = findex_df[selected_columns]

# 🔹 Save cleaned dataset
cleaned_file_path = "Cleaned_FINDEX.csv"
findex_df.to_csv(cleaned_file_path, index=False)

print("FINDEX data cleaning completed. Cleaned file is saved as 'Cleaned_FINDEX.csv'")
