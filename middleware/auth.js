const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
        req.user = decoded;  // Attach user info to request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;
