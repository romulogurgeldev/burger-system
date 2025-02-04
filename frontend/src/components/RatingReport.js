import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RatingReport = () => {
  const [ratings, setRatings] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get('/api/orders/ratings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };
    fetchRatings();
  }, [token]);

  return (
    <div>
      <h2>Rating Report</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.orderId}>
              <td>{rating.orderId}</td>
              <td>{rating.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingReport;
