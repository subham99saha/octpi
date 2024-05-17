
const express = require('express');
const router = express.Router();
const paymentsService = require('./services');

router.get('/', async (req, res) => {
  const response = await paymentsService.getPayments();
  res.status((response.success === true) ? 201 : 500).json(response);
});

router.post('/create-order', async (req, res) => {
  const response = await paymentsService.createOrder(req.body);
  res.status((response.success === true) ? 201 : 500).json(response);
});

router.post('/record-payment', async (req, res) => {
  const response = await paymentsService.recordPayment(req.body);
  res.status((response.success === true) ? 201 : 500).json(response);
});

module.exports = router;
