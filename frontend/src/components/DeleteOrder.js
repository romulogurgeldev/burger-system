import React from 'react';
import axios from 'axios';

const DeleteOrder = ({ orderId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      console.log('Order deleted:', orderId);
      // Optionally, you can add logic to refresh the order list or give feedback
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      Excluir Pedido
    </button>
  );
};

export default DeleteOrder;
