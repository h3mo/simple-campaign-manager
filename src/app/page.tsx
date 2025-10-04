"use client";
import CampaignForm from "./components/CampaignForm";
import CampaignTable from "./components/CampaignTable";
import CampaignPieChart from "./components/CampaignPieChart";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";

export default function Home() {
  type Campaign = {
    id: number;
    name: string;
    budget: number;
    start_date: string;
    end_date: string;
    status: string;
  };
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showActive, setShowActive] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadCampaigns();
    }
  }, [isAuthenticated]);

  const loadCampaigns = () => {
    fetch("/api/campaigns")
      .then((response) => response.json())
      .then((data) => setCampaigns(data))
      .catch((error) => console.error("Error fetching campaigns:", error));
  };

  const handleLogin = (username: string, password: string): boolean => {
    console.log("Login attempt:", { username, password });
    if (username === "admin" && password === "1234") {
      console.log("Login successful");
      setIsAuthenticated(true);
      return true;
    }
    console.log("Login failed");
    return false;
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Campaign Manager
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Form and Chart side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
          <div>
            <CampaignForm onCampaignCreated={loadCampaigns} />
          </div>
          <div>
            <CampaignPieChart campaigns={campaigns} />
          </div>
        </div>
        
        {/* Table */}
        <CampaignTable 
          campaigns={campaigns} 
          showActive={showActive} 
          onToggleFilter={() => setShowActive(!showActive)} 
        />
      </main>
    </div>
  );
}
