/*jslint node: true*/
/*jslint esnext: true*/

const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, resp) => {
  resp.render('transfer');
});
router.post('/transfer', (req, resp) => {
  const amount = parseInt(req.body.amount, 10);
  accounts[req.body.from].balance = accounts[req.body.from].balance - amount;
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + amount;
  
  writeJSON();
  resp.render('transfer', { message: 'Transfer Completed'});
});

router.get('/payment', (req, resp) => {
  resp.render('payment', { account: accounts.credit });
});
router.post('/payment', (req, resp) => {
  const amount = parseInt(req.body.amount, 10);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;
  
  writeJSON();
  resp.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;