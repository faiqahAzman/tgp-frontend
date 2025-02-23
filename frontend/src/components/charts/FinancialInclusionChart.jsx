import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AccountOwnershipChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [fullData, setFullData] = useState([]);

  const processChartData = useCallback((data, country) => {
    if (!data || data.length === 0) {
      setError(`No data available for ${country}`);
      setChartData(null);
      return;
    }

    // Filter data by country and specific short indicator
    const countryData = data.filter((row) => 
      row.Country === country && row["Short Indicator"] === "Account ownership at a financial institution or with a mobile-money-service provider"
    );

    if (countryData.length === 0) {
      setError(`No data found for ${country}`);
      setChartData(null);
      return;
    }

    setError(null);

    const transformedData = {};
    countryData.forEach((row) => {
      const indicator = row["Short Indicator"];
      Object.keys(row).forEach((key) => {
        if (!isNaN(key)) {
          if (!transformedData[indicator]) {
            transformedData[indicator] = {};
          }
          transformedData[indicator][key] = row[key];
        }
      });
    });

    const indicators = Object.keys(transformedData);
    if (indicators.length === 0) {
      setError(`No data found for ${country}`);
      setChartData(null);
      return;
    }

    const years = Object.keys(transformedData[indicators[0]]);
    const datasets = indicators.map((indicator) => ({
      label: indicator,
      data: years.map((year) => transformedData[indicator][year] || null),
      borderColor: getRandomColor(),
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      pointRadius: 5,
      borderWidth: 3,
      fill: false,
      tension: 0.4,  // Smooth the line
    }));

    setChartData({ labels: years, datasets });
  }, []);

  useEffect(() => {
    fetch("/Cleaned_WDIEXCEL.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const data = result.data;
            setFullData(data);

            const uniqueCountries = [...new Set(data.map((row) => row.Country))].filter(Boolean);
            setCountries(uniqueCountries);

            const defaultCountry = uniqueCountries.includes("Malaysia") ? "Malaysia" : uniqueCountries[0] || "";
            setSelectedCountry(defaultCountry);

            if (defaultCountry) {
              processChartData(data, defaultCountry);
            }
          },
          error: (parseError) => {
            setError(`Error parsing CSV: ${parseError.message}`);
          },
        });
      })
      .catch((fetchError) => {
        setError(`Error fetching CSV: ${fetchError.message}`);
      });
  }, [processChartData]);

  const getRandomColor = () => {
    return `hsl(${Math.random() * 360}, 70%, 50%)`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Account Ownership by Demographic Group</h2>

      {error && <p className="text-red-500 font-medium text-center">{error}</p>}

      <div className="flex justify-center mb-6">
        <label className="font-medium text-lg mr-2">Select Country:</label>
        <select
          className="border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-300"
          onChange={(e) => {
            const newCountry = e.target.value;
            setSelectedCountry(newCountry);
            processChartData(fullData, newCountry);
          }}
          value={selectedCountry}
        >
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-blue-600 font-bold text-center mt-2">{error}</p>
      ) : chartData && chartData.datasets.length > 0 ? (
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              plugins: { 
                legend: { 
                  position: 'top', 
                  labels: { boxWidth: 15, font: { size: 14 } } 
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Year: ${tooltipItem.label}, Value: ${tooltipItem.raw}%`;
                    }
                  }
                }
              },
              scales: {
                x: { 
                  title: { 
                    display: true, 
                    text: 'Year', 
                    font: { size: 16, weight: 'bold' } 
                  }
                },
                y: { 
                  title: { 
                    display: true, 
                    text: 'Percentage (%)', 
                    font: { size: 16, weight: 'bold' } 
                  },
                  min: 0,
                  max: 100
                }
              },
              elements: {
                point: { radius: 5 }
              }
            }} 
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">📡 Loading data...</p>
      )}
    </div>
  );
};

export default AccountOwnershipChart;
