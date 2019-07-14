/*jslint node: true*/
/*jslint esnext: true*/

'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');


const { accounts, users, writeJSON } = require('./data');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, resp) => {
  resp.render('index', { title: 'Account Summary', accounts });
});

app.get('/savings', (req, resp) => {
  resp.render('account', { account: accounts.savings });
});

app.get('/checking', (req, resp) => {
  resp.render('account', { account: accounts.checking });
});

app.get('/credit', (req, resp) => {
  resp.render('account', { account: accounts.credit });
});

app.get('/transfer', (req, resp) => {
  resp.render('transfer');
});
app.post('/transfer', (req, resp) => {
  const amount = parseInt(req.body.amount, 10);
  accounts[req.body.from].balance = accounts[req.body.from].balance - amount;
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + amount;
  
  writeJSON();
  resp.render('transfer', { message: 'Transfer Completed'});
});

app.get('/payment', (req, resp) => {
  resp.render('payment', { account: accounts.credit });
});
app.post('/payment', (req, resp) => {
  const amount = parseInt(req.body.amount, 10);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;
  
  writeJSON();
  resp.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

app.get('/profile', (req, resp) => {
  return resp.render('profile', { user: users[0] });
});

app.listen(3000, () => {
  console.log('PS Project Running');
});