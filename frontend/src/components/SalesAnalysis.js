import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const SalesAnalysis = () => {
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/sales/analysis', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const labels = response.data.map(data => data.productName);
        const data = response.data.map(data => data.totalSales);
        setSalesData({
          labels,
          datasets: [{
            label: 'Sales by Product',
            data,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching sales analysis data:', error);
      }
    };
    fetchSalesData();
  }, [token]);

  const exportToCSV = () => {
    const csvData = salesData.datasets[0].data.map((value, index) => `Product: ${salesData.labels[index]}, Total Sold: ${value}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sales_analysis_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card">
      <div className="card-header">
        Sales Analysis
      </div>
      <div className="card-body">
        <Bar data={salesData} />
        <button className="btn btn-success mt-3" onClick={exportToCSV}>Export to CSV</button>
      </div>
    </div>
  );
};

export default SalesAnalysis;
