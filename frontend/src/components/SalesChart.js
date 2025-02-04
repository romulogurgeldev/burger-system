import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const SalesChart = () => {
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/sales/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const labels = response.data.map(sale => sale.date);
        const data = response.data.map(sale => sale.total);
        setSalesData({
          labels,
          datasets: [{
            label: 'Total Sales',
            data,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          }],
        });
      } catch (error) {
        console.error('Error fetching sales data for chart:', error);
      }
    };
    fetchSalesData();
  }, [token]);

  return (
    <div className="card">
      <div className="card-header">
        Sales Chart
      </div>
      <div className="card-body">
        <Bar data={salesData} />
      </div>
    </div>
  );
};

export default SalesChart;
