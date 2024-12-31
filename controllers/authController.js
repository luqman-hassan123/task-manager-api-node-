// controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct (for simplicity, not hashing in this example)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
