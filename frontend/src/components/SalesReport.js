import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('/api/sales', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    fetchSales();
  }, [token]);

  const exportToCSV = () => {
    const csvData = sales.map(sale => `Order ID: ${sale._id}, Total: ${sale.total}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sales_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Sales Report</h2>
      <button onClick={exportToCSV}>Export to CSV</button>
      <ul>
        {sales.map(sale => (
          <li key={sale._id}>Order ID: {sale._id} - Total: {sale.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReport;
