import { Dashboard } from "@/components/dashboard/Dashboard";
import { useEffect } from "react"; 

const Index = () => {
  useEffect(() => {
    document.title = "MayNet Dashboard"; // ✅ Updates the browser tab title
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[rgba(252,251,252,1)] p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to MayNet Dashboard</h1> {/* ✅ Added title here */}
      <Dashboard />
    </div>
  );
};

export default Index;
