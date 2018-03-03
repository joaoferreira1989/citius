const express = require('express');
const router = express.Router();
const { getAuthData } = require('../lib/req/auth');

router.get('/', function (req, res, next) {
  getAuthData();

  res.send('respond with a resource');
});

module.exports = router;
