// Modules/Users/routes.js

const express = require('express');
const router = express.Router();
const usersService = require('./services');

router.get('/', async (req, res) => {
  const response = await usersService.getAllUsers();
  res.status(200).json(response);
});

// APIs
router.get('/save/:clientId', async (req, res) => {
  const { clientId } = req.params;
  const response = await usersService.saveUser(clientId);
  res.status(200).json(response);
});

router.get('/delete/:clientId', async (req, res) => {
  const { clientId } = req.params;
  const response = await usersService.deleteUser(clientId);
  res.status(200).json(response);
});

router.get('/check/:clientId', async (req, res) => {
  const { clientId } = req.params;
  const response = await usersService.checkUser(clientId);
  res.status(200).json(response);
});

router.get('/add-amount/:clientId/:amount', async (req, res) => {
  const { clientId, amount } = req.params;
  const response = await usersService.addAmount(clientId,amount);
  res.status(200).json(response);
});

router.get('/check-amount/:clientId', async (req, res) => {
  const { clientId, amount } = req.params;
  const response = await usersService.checkAmount(clientId,amount);
  res.status(200).json(response);
});

router.get('/check-pay-eligiblity/:clientId', async (req, res) => {
  const { clientId } = req.params;
  const response = await usersService.checkPayEligibility(clientId);
  res.status(200).json(response);
});

router.get('/set-pay-eligiblity/:clientId', async (req, res) => {
  const { clientId } = req.params;
  const response = await usersService.setPayEligibility(clientId);
  res.status(200).json(response);
});

router.get('/update-values/:clientId/:rptCust/:rptBuss', async (req, res) => {
  const { clientId, rptCust, rptBuss } = req.params;
  const response = await usersService.updateValues(clientId,rptCust,rptBuss);
  res.status(200).json(response);
});

module.exports = router;
