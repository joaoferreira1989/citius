const express = require('express');
const router = express.Router();
const { doFetch } = require('../lib/req/citius');

router.get('/', function (req, res, next) {
    const initialDate = '03-01-2018';
    const finalDate = '03-01-2018';

    doFetch(initialDate, finalDate).then((response) => {
        console.log(response);
        res.send('fetching done');
    });
});

module.exports = router;
