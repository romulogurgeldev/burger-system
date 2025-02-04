import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateOrder from './UpdateOrder';
import DeleteOrder from './DeleteOrder';
import EditOrder from './EditOrder';
import OrderSearch from './OrderSearch';
import OrderFilter from './OrderFilter';
import OrderRating from './OrderRating';
import { Modal, Button } from 'react-bootstrap';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleUpdate = (updatedOrder) => {
    setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
    setEditingOrder(null);
  };

  const handleDelete = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Logic to delete the order using selectedOrderId
    setShowModal(false);
  };

  return (
    <div>
      <h2>Order List</h2>
      <OrderFilter setFilteredOrders={setFilteredOrders} orders={orders} />
      <ul>
        {(filteredOrders.length > 0 ? filteredOrders : orders).map(order => (
          <li key={order._id}>
            Order ID: {order._id} - Status: {order.status}
            <button onClick={() => handleEdit(order)}>Edit</button>
            <OrderRating orderId={order._id} onRatingSubmit={(updatedOrder) => setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o))} />
          </li>
        ))}
      </ul>
      {editingOrder && <EditOrder order={editingOrder} onUpdate={handleUpdate} />}
    </div>
  );
};

export default OrderList;
