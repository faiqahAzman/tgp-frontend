import { DashboardHeader } from "./DashboardHeader";
import { APITile } from "./APITile";
import { EmploymentSection } from "./EmploymentSection";
import { ProgressBar } from "./ProgressBar";
import ChartComponent from "../ChartComponent";
import React, { useState } from 'react';
import ChartWithSelector from "../ChartWithSelector";

export const Dashboard = () => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  const apiUrl = 'https://api.worldbank.org/v2/country/MYS/indicator/FX.OWN.TOTL.ZS?date=2015:2020&format=json';
  const apiUrl2 = 'https://api.worldbank.org/v2/country/MYS/indicator/IT.NET.USER.ZS?date=2015:2020&format=json';
  const apiUrl3 = 'https://api.worldbank.org/v2/country/MYS/indicator/GC.DOD.TOTL.GD.ZS?date=2015:2020&format=json';
  const apiUrl4 = 'https://api.worldbank.org/v2/country/MYS/indicator/SI.RMT.COST.OB.ZS?date=2015:2020&format=json';
  const unemploymentApiUrl = 'https://api.worldbank.org/v2/country/MYS/indicator/SL.UEM.TOTL.NE.ZS?date=2023&format=json';
  const employmentRatioApiUrl = 'https://api.worldbank.org/v2/country/MYS/indicator/SL.EMP.TOTL.SP.ZS?date=2023&format=json';

  return (
    <div className="bg-white shadow-[0px_38px_200px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden p-[60px] rounded-3xl max-md:px-5">
      <main className="bg-[rgba(252,251,252,1)] self-stretch min-h-screen w-full max-w-[1160px] overflow-auto pb-[72px] max-md:max-w-full">
        <DashboardHeader />

        <div className="flex h-[837px] w-full justify-center flex-wrap mt-[30px] max-md:max-w-full">
          {/* Left Column */}
          <div className="min-w-60 min-h-[685px] w-[463px] pl-[15px] max-md:max-w-full">
            <APITile
              title="Financial Inclusion"
              className="min-h-[150px]"
            >


              <ChartWithSelector
                apiUrl={apiUrl}
                label="Account ownership (% of population ages 15+)"
              />
              {/* <ProgressBar description="Account Ownership (% of population ages 15+)" /> */}
            </APITile>

            <APITile
              title="Digital Payments"
              className="min-h-[150px] mt-[15px]"
            >

              <ChartWithSelector
                apiUrl={apiUrl2}
                label="Made or received a digital payment (% age 15+)"
              />
              {/* <ProgressBar description="Made or received a digital payment (% age 15+)" /> */}
            </APITile>

            <APITile
              title="Government Debt & Trade"
              className="min-h-[314px] mt-[15px]"

            >
              <ChartWithSelector
                apiUrl={apiUrl3}
                label="Central government debt, total (% of GDP)"
              />
            </APITile>
          </div>

          {/* Right Column */}
          <div className="min-w-60 flex-1 shrink basis-[0%] px-[15px] max-md:max-w-full">
            <div className="min-h-[315px] w-full max-md:max-w-full">
              <div className="flex w-full items-stretch gap-[19px] flex-1 h-full max-md:max-w-full">
                <EmploymentSection />
              </div>
            </div>

            <APITile
              title="Remittances"
              className="min-h-[315px] mt-[15px]"
            >
              <div className="flex w-full items-stretch gap-2 flex-1 h-full mt-2.5">
                <div className="min-w-60 w-full flex-1 shrink basis-[0%]">
                  <ChartWithSelector
                    apiUrl={apiUrl4}
                    label="Sent or received domestic remittances (% age 15+)"
                  />
                  {/* <ProgressBar description="Sent or received domestic remittances (% age 15+)" /> */}
                </div>
              </div>
            </APITile>
          </div>
        </div>
      </main>

      <footer className="text-[rgba(184,185,189,1)] text-xl font-normal text-center flex-1 mt-4">
        Copyright © 2025 Maynet TGP Ace
      </footer>
    </div>
  );
};
