import { useState } from "react";
import ChartComponent from "./ChartComponent";

interface ChartWithSelectorProps {
    apiUrl: string;
    label: string;
  }
  
const ChartWithSelector = ({ apiUrl, label }: ChartWithSelectorProps) => {
    const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  
    return (
      <>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'line' | 'bar' | 'pie')}
          className="w-full p-2 border rounded"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
  
        <ChartComponent
          apiUrl={apiUrl}
          chartType={chartType}
          label={label}
        />
      </>
    );
  };

export default ChartWithSelector;