import React, { useState } from 'react';
import axios from 'axios';

const EditOrder = ({ order, onUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/orders/${order._id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate(response.data);
      alert('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Order</h3>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
      <button type="submit">Update Order</button>
    </form>
  );
};

export default EditOrder;
