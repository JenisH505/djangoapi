// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Example roles, you can customize this as needed
    default: 'user', // Default role is 'user', you can change this as needed
  },
  // You can add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
