const express = require('express');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const wss = require('../socket');
const { sendNotification } = require('../notificationService');

// Default user credentials
const defaultUser = {
  username: 'admin',
  password: bcrypt.hashSync('password123', 8) // hashed password
};

// Register an admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });
  try {
    const savedAdmin = await admin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login an admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === defaultUser.username && bcrypt.compareSync(password, defaultUser.password)) {
    const token = jwt.sign({ id: defaultUser.username }, 'secret', { expiresIn: 86400 }); // expires in 24 hours
    return res.status(200).send({ auth: true, token });
  }
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: 'Admin not found' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

// Route for fetching sales report
router.get('/sales', async (req, res) => {
  try {
    const sales = await Order.find(); // Fetch all orders for the report
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales report:', error);
    res.status(500).send('Server error');
  }
});

// Route for fetching advanced sales report
router.get('/sales/advanced', async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $group: { _id: '$productId', totalSold: { $sum: '$quantity' } } },
    ]);
    res.json(sales);
  } catch (error) {
    console.error('Error fetching advanced sales report:', error);
    res.status(500).send('Server error');
  }
});

// Route for fetching sales analysis data
router.get('/sales/analysis', async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      { $group: { _id: '$productId', totalSales: { $sum: '$quantity' } } },
      { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }},
      { $unwind: '$product' },
      { $project: { productName: '$product.name', totalSales: 1 } }
    ]);
    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales analysis data:', error);
    res.status(500).send('Server error');
  }
});

// Route for fetching order analysis data
router.get('/orders/analysis', async (req, res) => {
  try {
    const orderData = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.json(orderData);
  } catch (error) {
    console.error('Error fetching order analysis data:', error);
    res.status(500).send('Server error');
  }
});

// Route for updating an order
router.put('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);

    // Notify all connected clients about the order update
    sendNotification(`Order ${orderId} has been updated.`);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).send('Server error');
  }
});

// Route for rating an order
router.post('/orders/:id/rate', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { rating } = req.body;
    // Logic to save the rating in the database
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { $push: { ratings: rating } }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error rating order:', error);
    res.status(500).send('Server error');
  }
});

// Route for fetching order ratings
router.get('/orders/ratings', async (req, res) => {
  try {
    const orders = await Order.find({}, 'ratings');
    const ratings = orders.map(order => ({ orderId: order._id, rating: order.ratings }));
    res.json(ratings);
  } catch (error) {
    console.error('Error fetching order ratings:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
