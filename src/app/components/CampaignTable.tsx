"use client";
import { useState } from "react";

type Campaign = {
  id: number;
  name: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: string;
};

type SortField = 'budget' | 'start_date' | 'end_date' | null;

interface CampaignTableProps {
  campaigns: Campaign[];
  showActive: boolean;
  onToggleFilter: () => void;
}

export default function CampaignTable({ campaigns, showActive, onToggleFilter }: CampaignTableProps) {
  const today = new Date().toISOString().split("T")[0];
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getStatus = (campaign: Campaign) => {
    return today >= campaign.start_date && today <= campaign.end_date
      ? "active"
      : "inactive";
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="text-gray-500 ml-1">↕</span>;
    }
    
    return sortDirection === 'asc' ? (
      <span className="text-gray-800 ml-1">↑</span>
    ) : (
      <span className="text-gray-800 ml-1">↓</span>
    );
  };

  const sortCampaigns = (campaigns: Campaign[]) => {
    if (!sortField) return campaigns;

    return [...campaigns].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDirection === 'asc' ? result : -result;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Campaigns</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Active Only</span>
          <button
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              showActive ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={onToggleFilter}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                showActive ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 md:px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th 
                className="px-3 md:px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('budget')}
              >
                Budget {getSortIcon('budget')}
              </th>
              <th 
                className="px-3 md:px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('start_date')}
              >
                Start Date {getSortIcon('start_date')}
              </th>
              <th 
                className="px-3 md:px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('end_date')}
              >
                End Date {getSortIcon('end_date')}
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortCampaigns(campaigns
              .filter((campaign) =>
                showActive ? getStatus(campaign) === "active" : true
              ))
              .map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="px-3 md:px-4 py-3 text-sm text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-sm text-gray-900">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-sm text-gray-900">
                    {campaign.start_date}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-sm text-gray-900">
                    {campaign.end_date}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      getStatus(campaign) === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatus(campaign)}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
