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

  return (
    <div>
      <h2>Relatório de Vendas</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale._id}>Pedido ID: {sale.orderId} - Total: {sale.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReport;
