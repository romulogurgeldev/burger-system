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
import SalesChart from './components/SalesChart';
import AdvancedSalesReport from './components/AdvancedSalesReport';
import Notification from './components/Notification';
import SalesAnalysis from './components/SalesAnalysis';
import OrderAnalysis from './components/OrderAnalysis';
import RatingReport from './components/RatingReport';

function App() {
  const sampleOrder = { _id: '1', items: [] }; // Replace with actual order data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Assuming you have a way to determine if the user is an admin
  const [notification, setNotification] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Logic to check if the user is admin and set isAdmin accordingly
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Auto-close after 3 seconds
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-4">Bem-vindo à Hamburgueria!</h1>
        {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        <Menu />
        <OrderList />
        {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <>
          <PaymentForm order={sampleOrder} />
          <CustomerOrders />
          <CustomerProfile />
          <EditProfile />
          {isAdmin && <ManageProducts />}
          <SalesChart />
          {isAdmin && <SalesReport />}
          <AdvancedSalesReport />
          {isAdmin && <SalesAnalysis />}
          {isAdmin && <OrderAnalysis />}
          {isAdmin && <RatingReport />}
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </>}
      </div>
    </div>
  );
}

export default App;
