import StatCard from "../StatCard";
import { ProgressBar } from "./ProgressBar";

export const EmploymentSection = () => {

  const unemploymentApiUrl = 'https://api.worldbank.org/v2/country/MYS/indicator/SL.UEM.TOTL.NE.ZS?date=2022&format=json';
  const employmentRatioApiUrl = 'https://api.worldbank.org/v2/country/MYS/indicator/SL.EMP.TOTL.SP.ZS?date=2023&format=json';

  return (
    <div className="flex flex-col shadow-[0px_0px_100px_rgba(0,0,0,0.02)] relative  min-w-60 w-full overflow-hidden flex-1 shrink basis-[0%] p-4 rounded-xl">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4b82d54accaff849e3b77f9251832ba0fa8fc924d83bfd4f923e96c32fe5e941?placeholderIfAbsent=true&width=2000 2000w"
        className="absolute h-full w-full object-cover inset-0"
        alt="Employment background"
      />
      <div className="relative w-full text-xl text-white font-semibold whitespace-nowrap">
        Employment
      </div>
      <div className="relative flex w-full items-stretch gap-2 flex-1 flex-wrap h-full mt-2.5">
        <div className="min-w-60 flex-1 shrink basis-[0%]">
          <StatCard
            apiUrl={unemploymentApiUrl}
            label="Unemployment, total (% of total labor force)"
            variant="primary"
          />

        </div>
        <div className="min-w-60 text-sm text-white font-normal flex-1 shrink basis-[0%]">
          <StatCard
            apiUrl={employmentRatioApiUrl}
            label="Employment to population ratio, 15+, total (%)"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};
