import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const OrderAnalysis = () => {
  const [orderData, setOrderData] = useState({ labels: [], datasets: [] });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('/api/orders/analysis', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const labels = response.data.map(data => data.status);
        const data = response.data.map(data => data.count);
        setOrderData({
          labels,
          datasets: [{
            label: 'Orders by Status',
            data,
            backgroundColor: 'rgba(153,102,255,0.4)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching order analysis data:', error);
      }
    };
    fetchOrderData();
  }, [token]);

  return (
    <div>
      <h2>Order Analysis</h2>
      <Bar data={orderData} />
    </div>
  );
};

export default OrderAnalysis;
