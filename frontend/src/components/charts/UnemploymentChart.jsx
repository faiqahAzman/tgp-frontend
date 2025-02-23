import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UnemploymentChart = () => {
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

    // 🎯 **Filter only "UE, Total (% of Total labor force) (Nat)"**
    const countryData = data.filter(
      (row) => row.Country === country && row["Short Indicator"] === "UE, Total (% of Total labor force) (Nat)"
    );

    if (countryData.length === 0) {
      setError(`No unemployment data found for ${country}`);
      setChartData(null);
      return;
    }

    setError(null);

    const years = Object.keys(countryData[0])
      .filter((key) => !isNaN(key)) // Keep only numeric years
      .sort(); // Ensure chronological order

    const values = years.map((year) => countryData[0][year] ?? null);

    setChartData({
      labels: years,
      datasets: [
        {
          label: "Unemployment Rate (%)",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  useEffect(() => {
    fetch("/Cleaned_WDIEXCEL.csv") // Ensure correct file path
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Unemployment Rate (UE Total)</h2>

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
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { 
                legend: { 
                  position: "top", 
                  labels: { boxWidth: 15, font: { size: 14 } } 
                } 
              },
              scales: {
                x: { 
                  title: { display: true, text: "Year", font: { size: 16, weight: "bold" } } 
                },
                y: { 
                  title: { display: true, text: "Unemployment Rate (%)", font: { size: 16, weight: "bold" } },
                  beginAtZero: true
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">📡 Loading data...</p>
      )}
    </div>
  );
};

export default UnemploymentChart;
