const mongoose = require('mongoose');

const rentBookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
 rent_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  payment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const RentBooking = mongoose.model('RentBooking', rentBookingSchema);

module.exports = RentBooking;
