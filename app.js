const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');  // Import the authentication routes
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Route middleware
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);  // Use auth routes

// Connect to MongoDB using environment variables
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/task-manager'; // Database URI from .env or fallback to local
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Start the server
const PORT = process.env.PORT || 3000;  // Port from environment variable or fallback to 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
