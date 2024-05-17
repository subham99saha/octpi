// Models/Users.js

const mongoose = require('mongoose');

// Define the schema for the 'Users' model
const userSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true
  },
  amountDue: {
    type: Number,
    required: true,
    default: 0
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the 'Users' model
module.exports = mongoose.model('Users', userSchema);
