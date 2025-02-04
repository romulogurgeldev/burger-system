const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/orders', require('./routes/orderRoutes')); // Order routes
app.use('/api/products', require('./routes/productRoutes')); // Product routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});