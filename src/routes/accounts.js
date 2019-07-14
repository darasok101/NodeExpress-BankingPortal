/*jslint node: true*/
/*jslint esnext: true*/

const express = require('express');

const router = express.Router();
const { accounts } = require('../data');



router.get('/savings', (req, resp) => {
  resp.render('account', { account: accounts.savings });
});

router.get('/checking', (req, resp) => {
  resp.render('account', { account: accounts.checking });
});

router.get('/credit', (req, resp) => {
  resp.render('account', { account: accounts.credit });
});


module.exports = router;