import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('/api/customers/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomer();
  }, [token]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h2>Perfil do Cliente</h2>
      <p>Nome: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <h3>Meus Pedidos</h3>
      <ul>
        {customer.orders.map(order => (
          <li key={order._id}>Pedido ID: {order._id} - Status: {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerProfile;
