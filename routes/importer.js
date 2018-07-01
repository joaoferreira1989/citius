const express = require('express');
const moment = require('moment');
const router = express.Router();
const { doFetch } = require('../lib/req/citius');
const { insertProcess } = require('../db/model/process');
const insoActs = [
    'Anúncio sent Insolvência c/ Ass.Cred - P Citius',
    'Anúncio sent Insolvência c/ Ass.Cred. - P Citius',
    'Anúncio sent Insolvência s/ Ass. Cred. - P Citius',
    'Anúncio sent Insolvência s/ Ass.Cred - P Citius',
    'Anúncio sent Insolvência s/ Ass.Cred. - P Citius',
    'Pub. - Sentença Declaração Insolvência'
];
const subActs = [
    'Anúncio - destituição e nomeação - Portal Citius',
    'Anúncio destituição e nomeação - Portal Citius',
    'Pub. - Destituição / Nomeação Administrador'
];
const perActs = [
    'Anúncio PEAP - artº 34 - P Citius',
    'Anúncio PER - artº 34 - P Citius',
    'Anúncio sentença (PER) - Portal Citius',
    'Pub. - Nomeação Administrador Provisório'
];
const insuActs = [
    'Anúncio sent Insolvência Insuf Massa - P Citius',
    'Pub. - Sent. Insolv. Insuficiência de Massa'
];

router.get('/', function (req, res, next) {
    const aggr = req.query.aggr;
    const range = req.query.range;

    let actsList;
    switch (aggr) {
        case 'inso':
            actsList = insoActs;
            break;
        case 'sub':
            actsList = subActs;
            break;
        case 'per':
            actsList = perActs;
            break;
        case 'insu':
            actsList = insuActs;
            break;
        default:
            return res.send('invalid act aggregator');
    }

    let initialDate;
    let finalDate = moment();
    switch (range) {
        case 'daily':
            initialDate = moment().subtract(1, 'days');
            break;
        case 'weekly':
            initialDate = moment().subtract(7, 'days');
            break;
        default:
            return res.send('invalid range');
    }

    if (!initialDate || !actsList) {
        return res.send('invalid parameters');
    }

    initialDate.set({
        hour: '00',
        minute: '00',
        second: '00',
        millisecond: '000'
    });
    finalDate.set({
        hour: '23',
        minute: '59',
        second: '59',
        millisecond: '000'
    });

    doFetch(initialDate, finalDate, actsList).then((actList) => {
        actList.forEach((processList) => {
            insertProcesses(processList);
        });

        return res.send('done');
    });
});

router.get('/inso/', function (req, res, next) {
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;
    const actsToFetchList = [
        'Anúncio sent Insolvência c/ Ass.Cred - P Citius',
        'Anúncio sent Insolvência c/ Ass.Cred. - P Citius',
        'Anúncio sent Insolvência s/ Ass. Cred. - P Citius',
        'Anúncio sent Insolvência s/ Ass.Cred - P Citius',
        'Anúncio sent Insolvência s/ Ass.Cred. - P Citius',
        'Pub. - Sentença Declaração Insolvência'
    ];

    doFetch(initialDate, finalDate, actsToFetchList).then((actList) => {
        actList.forEach((processList) => {
            insertProcesses(processList);
        });

        return res.send('done');
    });
});

router.get('/sub/', function (req, res, next) {
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;
    const actsToFetchList = [
        'Anúncio - destituição e nomeação - Portal Citius',
        'Anúncio destituição e nomeação - Portal Citius',
        'Pub. - Destituição / Nomeação Administrador'
    ];

    doFetch(initialDate, finalDate, actsToFetchList).then((actList) => {
        actList.forEach((processList) => {
            insertProcesses(processList);
        });

        return res.send('done');
    });
});

router.get('/per/', function (req, res, next) {
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;
    const actsToFetchList = [
        'Anúncio PEAP - artº 34 - P Citius',
        'Anúncio PER - artº 34 - P Citius',
        'Anúncio sentença (PER) - Portal Citius',
        'Pub. - Nomeação Administrador Provisório'
    ];

    doFetch(initialDate, finalDate, actsToFetchList).then((actList) => {
        actList.forEach((processList) => {
            insertProcesses(processList);
        });

        return res.send('done');
    });
});

router.get('/insu/', function (req, res, next) {
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;
    const actsToFetchList = [
        'Anúncio sent Insolvência Insuf Massa - P Citius',
        'Pub. - Sent. Insolv. Insuficiência de Massa'
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
