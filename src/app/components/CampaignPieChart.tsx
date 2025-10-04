"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Campaign = { id: number; name: string; budget: number; start_date: string; end_date: string; status: string; };

export default function CampaignPieChart({ campaigns }: { campaigns: Campaign[] }) {
  const today = new Date().toISOString().split("T")[0];
  const activeCampaigns = campaigns.filter(c => today >= c.start_date && today <= c.end_date);
  const totalBudget = activeCampaigns.reduce((sum, c) => sum + c.budget, 0);

  if (!activeCampaigns.length) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Active Campaign Budget</h3>
        <p className="text-gray-500">No active campaigns</p>
      </div>
    );
  }

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Active Campaign Budget</h3>
      <div className="text-center mb-4">
        <div className="text-xl md:text-2xl font-bold text-gray-800">${totalBudget.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Total Active Budget</div>
      </div>
      
      <div className="h-64 md:h-80">
        <Pie 
          data={{
            labels: activeCampaigns.map(c => c.name),
            datasets: [{
              data: activeCampaigns.map(c => c.budget),
              backgroundColor: colors,
              borderColor: '#fff',
              borderWidth: 2,
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { 
                position: 'bottom' as const, 
                labels: { 
                  padding: 15, 
                  usePointStyle: true,
                  font: { size: 12 }
                } 
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    const value = context.parsed;
                    const percentage = ((value / totalBudget) * 100).toFixed(1);
                    return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
