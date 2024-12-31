const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure the email is unique
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
