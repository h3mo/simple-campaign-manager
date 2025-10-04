"use client";
import React, { useState } from "react";

type CampaignFormProps = {
  onCampaignCreated: () => void;
};
const CampaignForm: React.FC<CampaignFormProps> = ({ onCampaignCreated }) => {
  const [form, setForm] = useState({
    name: "",
    budget: 0,
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    e.preventDefault();
    const formData = {
      name: form.name,
      budget: form.budget,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    fetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onCampaignCreated(); // Update campaign list
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Add New Campaign</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter campaign name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) })}
            min={1}
            type="number"
            required
            placeholder="Enter budget amount"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.startDate}
            required
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            type="date"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.endDate}
            required
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            type="date"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
