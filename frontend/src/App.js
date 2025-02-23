import React from "react";
import FinancialInclusionChart from "./components/charts/FinancialInclusionChart"; 
import UnemploymentChart from "./components/charts/UnemploymentPopulationRatio"; 
import GDPGrowthChart from "./components/charts/GDPGrowthChart"; 
import DigitalPaymentChart from "./components/charts/DigitalPaymentChart"; 
import MoneyLaunderingChart from "./components/charts/MoneyLaunderingChart"; 

function App() {
  return (
    <div>
      <h1>Financial Inclusion & Access to Banking [Fraud Risk Indicator]</h1>
      <FinancialInclusionChart />
      
      <h1>Unemployment Rate [Fraud Risk Due to Economic Pressure]</h1>
      <UnemploymentChart />

      <h1>GDP Growth [Fraud Risk During Economic Downturns]</h1>
      <GDPGrowthChart />

      <h1>Digital Payments Usage [Fraud Risk in Online Transactions]</h1>
      <DigitalPaymentChart />

      <h1>Money Laundering Risk [Personal Remittances % of GDP]</h1>
      <MoneyLaunderingChart />
    </div>
  );
}

export default App;