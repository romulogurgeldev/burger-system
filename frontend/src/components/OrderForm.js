import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState(''); // State for feedback message

  const handleChange = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', { products: selectedProducts });
      setMessage('Pedido criado com sucesso!'); // Success message
    } catch (error) {
      setMessage('Erro ao criar o pedido. Tente novamente.'); // Error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Faça seu pedido</h2>
      {products.map(product => (
        <div key={product._id}>
          <label>
            <input
              type="checkbox"
              value={product._id}
              onChange={() => handleChange(product._id)}
            />
            {product.name} - ${product.price}
          </label>
        </div>
      ))}
      <button type="submit">Enviar Pedido</button>
      {message && <p>{message}</p>} // Display feedback message
    </form>
  );
};

export default OrderForm;
