import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  apiUrl: string;
  chartType: 'line' | 'bar' | 'pie';
  label: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ apiUrl, chartType, label }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming the API returns an array of objects with labels and values
        const apiData = data[1]; // Access the second element of the array
        const labels = apiData.map((item) => item.date);
        const values = apiData.map((item) => item.value === null ? 0 : item.value); // Handle null values

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: label,
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart',
      },
    },
  };

  let chartComponent;

  switch (chartType) {
    case 'line':
      chartComponent = <Line data={chartData} options={chartOptions} />;
      break;
    case 'bar':
      chartComponent = <Bar data={chartData} options={chartOptions} />;
      break;
    case 'pie':
      chartComponent = <Pie data={chartData} options={chartOptions} />;
      break;
    default:
      chartComponent = <div>Invalid chart type</div>;
  }

  return <>{chartComponent}</>;
};

export default ChartComponent;
