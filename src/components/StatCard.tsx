import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface StatCardProps {
    apiUrl: string;
    label?: string;
    variant?: 'primary' | 'success' | 'warning' | 'danger';
    icon?: React.ReactNode;
    className?: string;
  }
  
  const StatCard = ({ apiUrl, label, variant = 'primary', icon, className }: StatCardProps) => {
    const [value, setValue] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          // Access the first item in the second array of the response
          const value = data[1][0].value;
          setValue(value);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [apiUrl]);
  
    return (
      <div className={cn(
        "p-6 rounded-lg shadow-sm bg-white",
        "flex flex-col items-center justify-center",
        "transition-all duration-200 hover:shadow-md",
        {
          'bg-blue-50 text-blue-700': variant === 'primary',
          'bg-green-50 text-green-700': variant === 'success',
          'bg-yellow-50 text-yellow-700': variant === 'warning',
          'bg-red-50 text-red-700': variant === 'danger',
        },
        className
      )}>
        {icon && <div className="mb-2">{icon}</div>}
        <div className="text-4xl font-bold">
          {isLoading ? (
            <div className="animate-pulse">Loading...</div>
          ) : (
            `${value?.toFixed(2)}%`
          )}
        </div>
        {label && <div className="mt-2 text-sm opacity-80">{label}</div>}
      </div>
    );
  };

export default StatCard;