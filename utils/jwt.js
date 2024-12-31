const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
    const payload = { userId };  // You can add other user data here if needed
    const secret = process.env.JWT_SECRET || 'JWT_SECRET';  // You can store the secret in the .env file
    const options = { expiresIn: '1h' };  // Token expiration (1 hour)

    return jwt.sign(payload, secret, options);  // Generate and return the token
};

module.exports = { generateToken };
