import { ReactNode } from "react";

interface FinancialCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

export const FinancialCard = ({
  title,
  children,
  className = "",
  darkMode = false,
}: FinancialCardProps) => {
  const baseClasses = "w-full flex-1 p-4 rounded-xl";
  const cardClasses = darkMode
    ? `bg-[rgba(56,56,56,1)] text-white ${baseClasses}`
    : `bg-white shadow-[0px_0px_100px_rgba(0,0,0,0.02)] ${baseClasses}`;

  return (
    <div className={`${cardClasses} ${className}`}>
      <div className="flex w-full gap-[19px] text-xl font-semibold">
        <div className="min-w-60 flex-1 shrink basis-[0%]">{title}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/079b50855dbea7f2832982518c7cea18b33652891db50c9173e683e75c52394d?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-6 shrink-0"
          alt=""
        />
      </div>
      {children}
    </div>
  );
};
