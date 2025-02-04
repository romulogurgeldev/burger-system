import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdvancedSalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/sales/advanced', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching advanced sales data:', error);
      }
    };
    fetchSalesData();
  }, [token]);

  return (
    <div>
      <h2>Advanced Sales Report</h2>
      <ul>
        {salesData.map(data => (
          <li key={data.productId}>Product ID: {data.productId} - Total Sold: {data.totalSold}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedSalesReport;
