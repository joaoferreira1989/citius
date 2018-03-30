const express = require('express');
const router = express.Router();
const { PEOPLE_TYPES } = require('../lib/tools/constants');
const { doFetch } = require('../lib/req/citius');
const { writeToFile } = require('../lib/tools/fs-helper');
const { insertProcess } = require('../db/model/process');

router.get('/', function (req, res, next) {
    const initialDate = '01-02-2018';
    const finalDate = '01-02-2018';

    doFetch(initialDate, finalDate).then((response) => {
        const csvData = response.map((act) => {
            return act.map(({ process, people }) => {
                insertProcess(process)
                    .then((processId) => {
                        console.log('Process ' + processId + ' inserted!');
                    })
                    .catch((error) => {
                        console.log('Error inserting process: ' + process.processDetails.number + ' - ' + process.date, error.sqlMessage);
                    });
            });
        });

        //writeToFile(JSON.stringify(response, null, 4));

        return res.send('done');
    });
});

module.exports = router;
