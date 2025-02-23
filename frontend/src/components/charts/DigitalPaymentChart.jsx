import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const DigitalPaymentsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([
    "Female % 15+",
    "Labor Force % 15+",
    "Poorest 40% 15+",
    "Richest 60% 15+",
    "Male % 15+",
    "Older % 25+",
    "Out of Labor Force % 15+",
    "Primary Education % 15+",
    "Rural % 15+",
    "Secondary Education % 15+",
    "Urban % 15+",
    "Young % 15-24",
  ]);
  const [selectedCountry, setSelectedCountry] = useState("Malaysia");
  const [selectedIndicator, setSelectedIndicator] = useState("Female % 15+");
  const [fullData, setFullData] = useState([]);

  const processChartData = useCallback((data, country, indicator) => {
    if (!data || data.length === 0) {
      setError(`No data available for ${country}`);
      setChartData(null);
      return;
    }

    const countryData = data.find(row => row.Country === country);
    if (!countryData) {
      setError(`No data found for ${country}`);
      setChartData(null);
      return;
    }

    setError(null);

    const years = ["2011", "2014", "2017", "2021", "2022"];
    const indicatorColumn = `Digital Payments (${indicator})`;
    const values = years.map(year => countryData[year] || 0);

    setChartData({
      labels: years,
      datasets: [
        {
          label: `Made or Received A Digital Payment (${indicator})`,
          data: values,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        }
      ]
    });
  }, []);

  useEffect(() => {
    fetch("/Cleaned_FINDEX.csv")
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const data = result.data.filter(row => row["Short Indicator"] === "made or received a");
            setFullData(data);

            const uniqueCountries = [...new Set(data.map(row => row.Country))].filter(Boolean);
            setCountries(uniqueCountries);

            processChartData(data, selectedCountry, selectedIndicator);
          },
          error: (parseError) => {
            setError(`Error parsing CSV: ${parseError.message}`);
          }
        });
      })
      .catch(fetchError => {
        setError(`Error fetching CSV: ${fetchError.message}`);
      });
  }, [processChartData, selectedCountry, selectedIndicator]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">📈 Digital Payments (% 15+)</h2>

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

      <div className="flex justify-center mb-4">
        <label className="font-medium text-md mr-2">Select Indicator:</label>
        <select
          className="border rounded-lg px-3 py-1 bg-gray-50 focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setSelectedIndicator(e.target.value)}
          value={selectedIndicator}
        >
          {indicators.map((indicator) => (
            <option key={indicator} value={indicator}>
              {indicator}
            </option>
          ))}
        </select>
      </div>

      {chartData ? (
        <div className="p-3 bg-gray-50 rounded-lg shadow-inner">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw}%`
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year",
                    font: { size: 14, weight: "bold" },
                    color: "#333",
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: "Digital Payments (% of Population)",
                    font: { size: 14, weight: "bold" },
                    color: "#333",
                  },
                  suggestedMin: 0,
                  suggestedMax: 100
                }
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

export default DigitalPaymentsChart;
