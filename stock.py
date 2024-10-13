import yfinance as yf

# Get stock data for Apple (AAPL)
ticker = 'AAPL'
stock = yf.Ticker(ticker)

# Get historical market data (last 5 days as an example)
historical_data = stock.history(period='ytd')

#with open("hey.txt", "w") as file:
    # Write data to the file
    #file.write(historical_data)

historical_data.to_csv('hey.txt', sep='\t', index=False, header=True)

print("Data has been written to output.txt")

# Display the data
print(historical_data)
