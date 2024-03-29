const express = require('express');
const router = express.Router();
const { getAllAdmIns } = require('../db/model/people');
const { getAllCourts } = require('../db/model/court');
const { fetchProcessesByAdminInsAndDate } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('processadmin');
});

router.get('/get-admins', function (req, res, next) {
    getAllAdmIns().then((admins) => {
        return res.send(admins);
    });
});

router.get('/get-courts', function (req, res, next) {
    getAllCourts().then((admins) => {
        return res.send(admins);
    });
});

router.get('/get-admin-ins-processes', function (req, res, next) {
    const id = req.query.id;
    const actAggId = req.query.actAggId;
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;
    const courtIds = req.query.courtIds && req.query.courtIds.split(',');
    const judgementIds = req.query.judgementids && req.query.judgementids.split(',');

    if (!id || !actAggId) {
        return res.send([]);
    }

    fetchProcessesByAdminInsAndDate(id, actAggId, initialDate, finalDate, courtIds, judgementIds).then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;
