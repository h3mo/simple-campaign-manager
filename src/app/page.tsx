"use client";
import CampaignForm from "./components/CampaignForm";
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

  //   //sorting
  const [sortBy, setSortBy] = useState("budget");
  const [sortDir, setSortDir] = useState("asc");

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (sortBy === "date") {
      return Number(a.budget) - Number(b.budget);
    }
    if (sortBy === "start_date") {
      return a.start_date.localeCompare(b.start_date);
    }
    if (sortBy === "end_date") {
      return a.end_date.localeCompare(b.end_date);
    }
    return 0;
  });

  const today = new Date().toISOString().split("T")[0];
  console.log("Today's date:", today);

  const getStatus = (campaign: Campaign) => {
    return today >= campaign.start_date && today <= campaign.end_date
      ? "active"
      : "inactive";
  };
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    fetch("/api/campaigns")
      .then((response) => response.json())
      .then((data) => setCampaigns(data))
      .catch((error) => console.error("Error fetching campaigns:", error));
  };

  return (
    <div>
      <main>
        <h1 className="text-4xl font-bold text-center mt-8">
          Campaign Manager
        </h1>
        <div>
          <CampaignForm onCampaignCreated={loadCampaigns} />
        </div>
        <div className="w-full">
          <div className="flex justify-end m:w-3/4 max-w-4xl mx-8 md:mx-auto">
            <button
              className="ml-8 mb-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowActive(!showActive)}
            >
              {showActive ? "Show All" : "Show Active"}
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-300 mx-8 md:mx-auto md:w-3/4 max-w-4xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Budget
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Start Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  End Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns
                .filter((campaign) =>
                  showActive ? getStatus(campaign) === "active" : true
                )
                .map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.budget}</td>
                    <td>{campaign.start_date}</td>
                    <td>{campaign.end_date}</td>
                    <td>{getStatus(campaign)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
