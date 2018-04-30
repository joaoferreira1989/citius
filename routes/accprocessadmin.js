const express = require('express');
const router = express.Router();
const { getAllAdmIns } = require('../db/model/people');
const { getAllCourts } = require('../db/model/court');
const { fetchProcessesByAdminIns } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('accprocessadmin');
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
    const courtIds = req.query.courtIds && req.query.courtIds.split(',');

    if (!id || !actAggId) {
        return res.send([]);
    }

    fetchProcessesByAdminIns(id, actAggId, courtIds).then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;
