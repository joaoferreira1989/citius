const express = require('express');
const router = express.Router();
const { PEOPLE_TYPES } = require('../lib/tools/constants');
const { doFetch } = require('../lib/req/citius');
const { insertProcess } = require('../db/model/process');

router.get('/', function (req, res, next) {
    const initialDate = '01-04-2018';
    const finalDate = '07-04-2018';
    const actsToFetchList = [
        'Pub. - Sentença Declaração Insolvência',
        'Pub. - Destituição / Nomeação Administrador',
        'Pub. - Nomeação Administrador Provisório'
    ];

    doFetch(initialDate, finalDate, actsToFetchList).then((actList) => {
        actList.forEach((processList) => {
            insertProcesses(processList);
        });

        return res.send('done');
    });
});

function insertProcesses(processList) {
    let insertPromise = Promise.resolve();

    for (let i = 0; i < processList.length; i++) {
        insertPromise = insertPromise.then(() => {
            let process = processList[i].process;
            let processPeople = processList[i].people;

            return insertProcess(process, processPeople)
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
