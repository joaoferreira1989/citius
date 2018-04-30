const express = require('express');
const router = express.Router();
const { getTopAdmIns } = require('../db/model/process');

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

module.exports = router;
