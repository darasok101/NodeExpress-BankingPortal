/*jslint node: true*/
/*jslint esnext: true*/

'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync(
  path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.join(__dirname, 'json', 'users.json'), 'utf8'
);
const users = JSON.parse(userData);

app.get('/', (req, resp) => {
  return resp.render('index', { title: 'Account Summary', accounts });
});

app.get('/savings', (req, resp) => {
  return resp.render('account', { account: accounts.savings });
});

app.get('/checking', (req, resp) => {
  return resp.render('account', { account: accounts.checking });
});

app.get('/credit', (req, resp) => {
  return resp.render('account', { account: accounts.credit });
});

app.get('/profile', (req, resp) => {
  return resp.render('profile', { user: users[0] });
});

app.listen(3000, () => {
  console.log('PS Project Running');
});