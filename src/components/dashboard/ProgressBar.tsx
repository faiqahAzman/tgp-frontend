interface ProgressBarProps {
  className?: string;
  description?: string;
  textColor?: string;
}

export const ProgressBar = ({
  className = "",
  description,
  textColor = "text-[rgba(184,185,189,1)]",
}: ProgressBarProps) => {
  return (
    <div className={`w-full mt-2.5 ${className}`}>
      <div className="bg-[rgba(235,235,235,1)] flex w-full flex-col overflow-hidden rounded-3xl">
        <div className="bg-[rgba(248,157,75,1)] flex min-h-2" />
      </div>
      {description && (
        <div
          className={`flex w-full items-center gap-4 text-sm ${textColor} font-normal mt-2`}
        >
          <div className="self-stretch min-w-60 gap-1 my-auto">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};
