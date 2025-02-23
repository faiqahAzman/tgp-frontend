import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const EmploymentVsUnemploymentChart = () => {
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

    const unemploymentData = data.find((row) => row.Country === country && row["Short Indicator"] === "UE, Total (% of Total labor force) (Nat)");
    const employmentData = data.find((row) => row.Country === country && row["Short Indicator"] === "Employment to population ratio, 15+, Total (%) (Nat)");

    if (!unemploymentData || !employmentData) {
      setError(`No relevant data found for ${country}`);
      setChartData(null);
      return;
    }

    setError(null);

    const years = Object.keys(unemploymentData).filter((key) => !isNaN(key));
    const unemploymentValues = years.map((year) => unemploymentData[year] || null);
    const employmentValues = years.map((year) => employmentData[year] || null);

    setChartData({
      labels: years,
      datasets: [
        {
          type: "bar",
          label: "Unemployment Rate (%)",
          data: unemploymentValues,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Employment to Population Ratio (%)",
          data: employmentValues,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          pointRadius: 5,
          borderWidth: 3,
          fill: false,
        },
      ],
    });
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

            processChartData(data, "Malaysia");
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Employment vs Unemployment</h2>

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

      {chartData ? (
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: { boxWidth: 15, font: { size: 14 } },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Year", font: { size: 16, weight: "bold" } },
                },
                y: {
                  title: { display: true, text: "Percentage (%)", font: { size: 16, weight: "bold" } },
                  beginAtZero: true,
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

export default EmploymentVsUnemploymentChart;
