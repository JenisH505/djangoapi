
const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  price: {
    type: String,
    default: '',
  },
});

const rent = mongoose.model('Rent', rentSchema);

module.exports = rent;
