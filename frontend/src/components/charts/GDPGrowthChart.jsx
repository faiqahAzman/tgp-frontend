import React, { useEffect, useState, useCallback } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

ChartJS.register(ArcElement, Tooltip, Legend);

const EconomicIndicatorsPieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Malaysia");
  const [fullData, setFullData] = useState([]);

  const processChartData = useCallback((data, country) => {
    if (!data || data.length === 0) {
      setError(`No data available for ${country}`);
      setChartData(null);
      return;
    }

    const indicators = [
      "Central government debt, Total (% of GDP)",
      "Revenue, excluding grants (% of GDP)",
      "Trade (% of GDP)",
      "Trade in services (% of GDP)"
    ];

    const countryData = data.filter(row => row.Country === country && indicators.includes(row["Short Indicator"]));
    if (countryData.length === 0) {
      setError(`No data found for ${country}`);
      setChartData(null);
      return;
    }

    setError(null);
    
    const labels = countryData.map(row => row["Short Indicator"]);
    const values = countryData.map(row => row["2022"] || 0); // Change 2022 to latest year available
    
    setChartData({
      labels,
      datasets: [
        {
          label: "% of GDP",
          data: values,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
          hoverBackgroundColor: ["#FF4364", "#2582CB", "#FFC046", "#2E7D32"],
        }
      ]
    });
  }, []);

  useEffect(() => {
    fetch("/Cleaned_WDIEXCEL.csv")
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const data = result.data;
            setFullData(data);
            
            const uniqueCountries = [...new Set(data.map(row => row.Country))].filter(Boolean);
            setCountries(uniqueCountries);
            
            processChartData(data, selectedCountry);
          },
          error: (parseError) => {
            setError(`Error parsing CSV: ${parseError.message}`);
          }
        });
      })
      .catch(fetchError => {
        setError(`Error fetching CSV: ${fetchError.message}`);
      });
  }, [processChartData, selectedCountry]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">📊 Economic Indicators (% of GDP)</h2>
      
      {error && <p className="text-red-500 font-medium text-center">{error}</p>}
      
      <div className="flex justify-center mb-4">
        <label className="font-medium text-md mr-2">Select Country:</label>
        <select
          className="border rounded-lg px-3 py-1 bg-gray-50 focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      
      {chartData ? (
        <div className="p-2 bg-gray-50 rounded-lg shadow-inner">
          <Pie 
            data={chartData} 
            options={{ 
              maintainAspectRatio: false, 
              responsive: true, 
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                  labels: {
                    font: {
                      size: 12
                    }
                  }
                }
              },
              width: 500, 
              height: 500 
            }} 
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">📡 Loading data...</p>
      )}
    </div>
  );
};

export default EconomicIndicatorsPieChart;
