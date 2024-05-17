// index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const config = require('./config.json'); // Import config from config.json

const usersRoutes = require('./Modules/Users/routes'); 
const subUsersRoutes = require('./Modules/SubUsers/routes');
const paymentsRoutes = require('./Modules/Payments/routes'); 

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware for JSON request body parsing
app.use(express.json());

app.use('/images', express.static('uploads/profile_pics'));

// Test GET route
app.get('/', (req, res) => {
  res.json({ message: 'API is up and running!' });
});

// Use Module Routes
app.use('/users', usersRoutes);
app.use('/subusers', subUsersRoutes);
app.use('/payments', paymentsRoutes);

// Connect to MongoDB using values from config.json
mongoose
  .connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server using the PORT from config.json
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
