import React, { useState } from 'react';
import axios from 'axios';

const OrderRating = ({ orderId, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/orders/${orderId}/rate`, { rating }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onRatingSubmit(response.data);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Rate Your Order</h3>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="0">Select Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="submit">Submit Rating</button>
    </form>
  );
};

export default OrderRating;
