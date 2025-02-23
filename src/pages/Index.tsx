import { Dashboard } from "@/components/dashboard/Dashboard";
import { useEffect } from "react"; 

const Index = () => {
  useEffect(() => {
    document.title = "MayNet Dashboard"; // ✅ Updates the browser tab title
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgba(252,251,252,1)] p-4">
      <Dashboard />
    </div>
  );
};

export default Index;
