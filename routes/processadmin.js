const express = require('express');
const router = express.Router();
const { getAllAdmIns } = require('../db/model/people');
const { fetchProcessesByAdminIns } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('processadmin');
});

router.get('/get-admins', function (req, res, next) {
    getAllAdmIns().then((admins) => {
        return res.send(admins);
    });
});

router.get('/get-admin-ins-processes', function (req, res, next) {
    const id = req.query.id;

    if (!id) {
        return res.send([]);
    }

    fetchProcessesByAdminIns(id).then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;