const express = require('express');
const router = express.Router();
const { getAllAdmIns } = require('../db/model/people');

router.get('/', function (req, res, next) {
    res.render('processadmin');
});

router.get('/get-admins', function (req, res, next) {
    getAllAdmIns().then((admins) => {
        return res.send(admins);
    });
});

module.exports = router;
