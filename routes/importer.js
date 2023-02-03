const express = require('express');
const moment = require('moment');
const router = express.Router();
const { doFetch } = require('../lib/req/citius');
const { insertProcess, hasProcessAdmin, fetchProcessDetails, addPersonToProcess } = require('../db/model/process');
const { ACT_AGGREGATOR_IDS, PEOPLE_TYPES } = require('../lib/tools/constants');
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

/**
 * http://localhost:8990/importer/inso?startdate=15-02-2021&enddate=15-02-2021
 *
 * http://localhost:8990/importer?aggr=inso&range=monthly&lastday=10     -> if we want the past month and it is march 10
 *
 */
router.get('/', function (req, res, next) {
    const aggr = req.query.aggr;
    const range = req.query.range;
    const lastDay = req.query.lastday || 0; // days until now, 0 = today

    let actsList;
    let aggregatorId;
    switch (aggr) {
        case 'inso':
            actsList = insoActs;
            aggregatorId = ACT_AGGREGATOR_IDS.INSO;
            break;
        case 'sub':
            actsList = subActs;
            aggregatorId = ACT_AGGREGATOR_IDS.SUB;
            break;
        case 'per':
            actsList = perActs;
            aggregatorId = ACT_AGGREGATOR_IDS.PER;
            break;
        case 'insu':
            actsList = insuActs;
            aggregatorId = ACT_AGGREGATOR_IDS.INSU;
            break;
        default:
            return res.send('invalid act aggregator');
    }

    let dayRange = 1;
    switch (range) {
        case 'daily':
            dayRange = 1;
            break;
        case 'weekly':
            dayRange = 7;
            break;
        case 'monthly':
            dayRange = 30;
            break;
        default:
            return res.send('invalid range');
    }

    const firstDay = parseInt(lastDay) + dayRange; // firstDay 40 && lastDay 10   ->   lastday = 10; range = monthly
                                                   // firstDay 1 && lastDay 0     ->   lastday = 0; range = daily

    const days = [...new Array(dayRange)].reduce((acc, _, index) => {
        const currentDay = firstDay - index - 2;
        const initialDate = moment().subtract(currentDay + 1, 'days');
        const finalDate = moment().subtract(currentDay + 1, 'days');

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

        acc.push({ initialDate, finalDate });

        return acc;
    }, []);

    console.log('=== Insert process will start for ===');
    days.forEach(({ initialDate }) => console.log(moment(initialDate).format('YYYY-MM-DD')));
    console.log('=====================================');

    fetchAll(days, actsList, aggregatorId).then(() => {
        return res.send('done');
    });
});

function fetchAll(days, actsList, aggregatorId) {
    var promise = Promise.resolve();

    days.forEach(day => promise = promise.then(() => dailyFetch(day, actsList, aggregatorId)));

    return promise;
}

function dailyFetch({ initialDate, finalDate }, actsList, aggregatorId) {
    return new Promise((resolve, reject) => {
        return doFetch(initialDate, finalDate, actsList).then((actList) => {
            actList.forEach((processList) => {
                insertProcesses(processList, aggregatorId);
            });

            resolve();
        });
    });
}

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
            insertProcesses(processList, ACT_AGGREGATOR_IDS.INSO);
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
            insertProcesses(processList, ACT_AGGREGATOR_IDS.SUB);
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
            insertProcesses(processList, ACT_AGGREGATOR_IDS.PER);
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
            insertProcesses(processList, ACT_AGGREGATOR_IDS.INSU);
        });

        return res.send('done');
    });
});

function insertProcesses(processList, aggregatorId) {
    let insertPromise = Promise.resolve();

    for (let i = 0; i < processList.length; i++) {
        insertPromise = insertPromise.then(() => {
            let process = processList[i].process;
            let processPeople = processList[i].people;
            let errorMsg;

            return insertProcess(process, processPeople)
                .then((processId) => {
                    console.log('Process ' + processId + ' inserted!');
                    errorMsg = '';
                })
                .catch((error) => {
                    errorMsg = error && error.sqlMessage || '';
                })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        const processNr = process && process.processDetails && process.processDetails.number;
                        const recordHasAdmin = processPeople.some(person => person.type === PEOPLE_TYPES.ADMINISTRADOR_INSOLVENCIA);

                        if (isProcessAlreadyExistsError(errorMsg)) {
                            if (recordHasAdmin) {
                                const hasAdminPromise = hasProcessAdmin(process.processDetails.number, aggregatorId);
                                const processDetailsPromise = fetchProcessDetails(process.processDetails.number, aggregatorId);

                                return Promise.all([hasAdminPromise, processDetailsPromise])
                                    .then(([hasProcessAdmin, processDetails]) => {
                                        if (!hasProcessAdmin) {
                                            const processId = processDetails[0].process_id;
                                            const person = processPeople.find(person => person.type === PEOPLE_TYPES.ADMINISTRADOR_INSOLVENCIA);

                                            return addPersonToProcess(person, processId).then((processPersonId) => {
                                                console.log('Process: ' + processNr + ' updated with processPersonId - ', processPersonId);
                                                resolve();
                                            });
                                        } else {
                                            console.log('Error inserting process: ' + processNr + ' - ' + process.date, errorMsg);
                                            resolve();
                                        }
                                    })
                                    .catch((updError) => {
                                        console.log('updError', updError);

                                        return reject(updError);
                                    });
                            } else {
                                console.log('Error updating process: ' + processNr + ' - Cannot be updated because record has no admin');

                                resolve();
                            }
                        }

                        console.log('Error inserting process: ' + processNr + ' - ' + process.date, errorMsg);
                        resolve();
                    });
                });
        });
    }
}

function isProcessAlreadyExistsError(error) {
    return error.includes("Duplicate entry") && error.includes("for key 'number_act_aggregator'");
}

module.exports = router;
