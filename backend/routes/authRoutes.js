const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: 'Admin not found' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
