const express = require('express');
const router = express.Router();
const { fetchProcessesTotal } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('processes');
});

router.get('/get', function (req, res, next) {
    const actaggregatorid = parseInt(req.query.actaggregatorid) || 1;
    const initialDate = req.query.startdate || '2018-01-01';
    const finalDate = req.query.enddate || '2018-12-31';

    fetchProcessesTotal(actaggregatorid, initialDate, finalDate).then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;
