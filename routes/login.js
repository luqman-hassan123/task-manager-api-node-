const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Sample user data (in real-world, you would fetch this from a database)
const users = [
  {
    email: "user@example.com",
    password: "$2a$10$N.x9MzKqv5E2AqPTK2XgDee1lz4S2hLvyykUwNN5.kOas3VPSBdZ6" // hashed password for "password123"
  }
];

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check if the password matches the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Create JWT token
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send response with the token
  res.status(200).json({ token });
});

module.exports = router;
