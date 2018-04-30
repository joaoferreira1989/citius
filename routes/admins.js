const express = require('express');
const router = express.Router();
const { getTopAdmIns, fetchAdminProcesses } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('admins');
});

router.get('/get-all', function (req, res, next) {
    const actaggregatorid = parseInt(req.query.actaggregatorid) || 1;
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;

    getTopAdmIns(actaggregatorid, initialDate, finalDate).then((topAdmins) => {
        return res.send({
            data: topAdmins
        });
    });
});

router.get('/get-admin-details', function (req, res, next) {
    const nif = req.query.nif;
    const actAggregatorId = req.query.actAggId;
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;

    if (!nif || !actAggregatorId || !initialDate || !finalDate) {
        return res.send([]);
    }

    fetchAdminProcesses(nif, actAggregatorId, initialDate, finalDate).then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;
