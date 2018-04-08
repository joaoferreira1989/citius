const express = require('express');
const router = express.Router();
const { getTopAdmIns } = require('../db/model/process');

router.get('/', function (req, res, next) {
    res.render('admins');
});

router.get('/get-all', function (req, res, next) {
    getTopAdmIns().then((topAdmins) => {
        return res.send({
            data: topAdmins
        });
    });
});

module.exports = router;
