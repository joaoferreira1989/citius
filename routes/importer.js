const express = require('express');
const router = express.Router();
const { PEOPLE_TYPES } = require('../lib/tools/constants');
const { doFetch } = require('../lib/req/citius');
const { insertProcess } = require('../db/model/process');

router.get('/', function (req, res, next) {
    const initialDate = '01-02-2018';
    const finalDate = '02-02-2018';

    doFetch(initialDate, finalDate).then((response) => {
        const processList = response.reduce((acc, act) => {
            act.forEach(({ process, people }) => {
                acc.push(process);
            });

            return acc;
        }, []);

        insertProcessList(processList);

        return res.send('done');
    });
});

function insertProcessList(processList) {
    let insertPromise = Promise.resolve();

    for (let i = 0; i < processList.length; i++) {
        insertPromise = insertPromise.then(() => {
            let process = processList[i];

            return insertProcess(process)
                .then((processId) => {
                    console.log('Process ' + processId + ' inserted!');
                })
                .catch((error) => {
                    const processNr = process && process.processDetails && process.processDetails.number;
                    const errorMsg = error && error.sqlMessage;

                    console.log('Error inserting process: ' + processNr + ' - ' + process.date, errorMsg);
                });
        });
    }
}

module.exports = router;
