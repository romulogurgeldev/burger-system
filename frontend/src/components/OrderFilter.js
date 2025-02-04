import React from 'react';
import './OrderFilter.css';

const OrderFilter = ({ setFilteredOrders, orders }) => {
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    const filtered = selectedStatus === 'all' ? orders : orders.filter(order => order.status === selectedStatus);
    setFilteredOrders(filtered);
  };

  return (
    <div className="form-group">
      <label htmlFor="statusFilter">Filter by Status</label>
      <select id="statusFilter" className="form-control" onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
};

export default OrderFilter;
