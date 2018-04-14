const express = require('express');
const router = express.Router();
const { fetchProcessesTotal } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('processes');
});

router.get('/get', function (req, res, next) {
    const actaggregatorid = parseInt(req.query.actaggregatorid) || 1;

    fetchProcessesTotal(actaggregatorid).then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;
