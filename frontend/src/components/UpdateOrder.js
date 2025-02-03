import React, { useState } from 'react';
import axios from 'axios';

const UpdateOrder = ({ orderId }) => {
  const [status, setStatus] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/orders/${orderId}`, { status });
      console.log('Order updated:', response.data);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Atualizar Status do Pedido</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Selecione o status</option>
        <option value="Em preparo">Em preparo</option>
        <option value="Saiu para entrega">Saiu para entrega</option>
        <option value="Entregue">Entregue</option>
      </select>
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default UpdateOrder;
