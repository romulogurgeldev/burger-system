import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateOrder from './UpdateOrder';
import DeleteOrder from './DeleteOrder';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            Pedido ID: {order._id} - Status: {order.status}
            <UpdateOrder orderId={order._id} />
            <DeleteOrder orderId={order._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
