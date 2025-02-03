import React, { useState } from 'react';
import Menu from './components/Menu';
import OrderList from './components/OrderList';
import PaymentForm from './components/PaymentForm';
import LoginForm from './components/LoginForm';
import CustomerOrders from './components/CustomerOrders';
import CustomerProfile from './components/CustomerProfile';
import EditProfile from './components/EditProfile';
import SalesReport from './components/SalesReport';
import ManageProducts from './components/ManageProducts';

function App() {
  const sampleOrder = { _id: '1', items: [] }; // Replace with actual order data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Assuming you have a way to determine if the user is an admin

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Logic to check if the user is admin and set isAdmin accordingly
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>Bem-vindo à Hamburgueria!</h1>
      <Menu />
      <OrderList />
      {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <><PaymentForm order={sampleOrder} /><CustomerOrders /><CustomerProfile /><EditProfile />{isAdmin && <ManageProducts />}{isAdmin && <SalesReport />}<button onClick={handleLogout}>Logout</button></>}
    </div>
  );
}

export default App;
