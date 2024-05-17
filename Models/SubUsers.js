
const mongoose = require('mongoose');

// Define the schema for the 'Users' model
const subUserSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String
  }
});

// Create and export the 'Users' model
module.exports = mongoose.model('SubUsers', subUserSchema);
