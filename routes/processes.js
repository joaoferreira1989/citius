const express = require('express');
const router = express.Router();
const { fetchProcesses } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('processes');
});

router.get('/get', function (req, res, next) {
    fetchProcesses().then((processes) => {
        return res.send(processes);
    });
});

module.exports = router;
