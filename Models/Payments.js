
const mongoose = require('mongoose');

// Define the schema for the 'Payments' model
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  signature: {
    type: String
  },
  clientId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  details: {
    type: Object
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the 'Payments' model
module.exports = mongoose.model('Payments', paymentSchema);
