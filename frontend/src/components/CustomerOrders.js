import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h2>Meus Pedidos</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>Pedido ID: {order._id} - Status: {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrders;
