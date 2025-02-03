import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('/api/customers/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomer();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/customers/me', { name, email }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erro ao atualizar perfil.');
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Perfil</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default EditProfile;
