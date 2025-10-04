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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-8 rounded-xl border-2 p-4 border-gray-300 mt-8 mx-8 md:w-1/2 md:mx-auto max-w-2xl"
    >
      <p className="text-sm font-medium my-0 py-0">Campaign name</p>
      <input
        className="border-1 px-2 py-1 rounded"
        aria-label="Campaign Name"
        type="text"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Campaign Name"
      />
      <input
        className="border-1 px-2 py-1 rounded"
        value={form.budget}
        onChange={(e) =>
          setForm({ ...form, budget: parseFloat(e.target.value) })
        }
        type="number"
        required
        placeholder="Budget"
      />
      <input
        className="border-1 px-2 py-1 rounded"
        value={form.startDate}
        required
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        type="date"
        placeholder="Start Date"
      />
      <input
        className="border-1 px-2 py-1 rounded"
        value={form.endDate}
        required
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        type="date"
        placeholder="End Date"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
