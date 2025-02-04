import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductSearch from './ProductSearch';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Please provide both name and price.');
      return;
    }
    if (price <= 0) {
      alert('Price must be greater than zero.');
      return;
    }
    if (editing) {
      try {
        const response = await axios.put(`/api/products/${editing._id}`, { name, price }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.map(product => product._id === editing._id ? response.data : product));
        setName('');
        setPrice('');
        setEditing(null);
        alert('Product updated successfully!');
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product.');
      }
    } else {
      try {
        const response = await axios.post('/api/products', { name, price }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts([...products, response.data]);
        setName('');
        setPrice('');
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(product => product._id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setName(product.name);
    setPrice(product.price);
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <ProductSearch setProducts={setProducts} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">{editing ? 'Update Product' : 'Add Product'}</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
