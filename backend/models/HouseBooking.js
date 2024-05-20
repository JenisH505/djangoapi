const mongoose = require('mongoose');

const propertyBookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
 property_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  payment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const PropertyBooking = mongoose.model('PropertyBooking', propertyBookingSchema);

module.exports = PropertyBooking;
