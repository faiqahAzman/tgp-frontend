import { DashboardHeader } from "./DashboardHeader";
import { APITile } from "./APITile";
import { EmploymentSection } from "./EmploymentSection";
import { ProgressBar } from "./ProgressBar";

export const Dashboard = () => {
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
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/dbf6346aed50cee5b6ac098dc30500e5f5a59233f64a624debabef1490b50b6b?placeholderIfAbsent=true&width=100 100w"
                className="aspect-[5.71] object-contain w-[251px] max-w-full mt-2.5"
                alt="Financial inclusion chart"
              />
              <ProgressBar description="Account Ownership (% of population ages 15+)" />
            </APITile>

            <APITile
              title="Digital Payments"
              className="min-h-[150px] mt-[15px]"
            >
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/dbf6346aed50cee5b6ac098dc30500e5f5a59233f64a624debabef1490b50b6b?placeholderIfAbsent=true&width=100 100w"
                className="aspect-[5.71] object-contain w-[251px] max-w-full mt-2.5"
                alt="Digital payments chart"
              />
              <ProgressBar description="Made or received a digital payment (% age 15+)" />
            </APITile>

            <APITile
              title="Government Debt & Trade"
              className="min-h-[314px] mt-[15px]"
              darkMode={true}
            >
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/191ad2f3cbd26d66e8de2e86ad0be228668a517523e7a2d53de234739fdb9429?placeholderIfAbsent=true&width=100 100w"
                className="aspect-[1.73] object-contain w-full flex-1 mt-[18px]"
                alt="Government debt chart"
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
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/a8782b444b260f2f8278f614ac9fab809168ef1b148fee6f6111f4ec6b85398d?placeholderIfAbsent=true&width=100 100w"
                    className="aspect-[3.23] object-contain w-full gap-2.5 flex-1 py-2.5"
                    alt="Remittances chart"
                  />
                  <ProgressBar description="Sent or received domestic remittances (% age 15+)" />
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
