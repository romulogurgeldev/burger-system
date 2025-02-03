import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';

const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <OrderForm products={products} />
    </div>
  );
};

export default Menu;
