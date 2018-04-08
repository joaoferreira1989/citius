const moment = require('moment');
const { pool } = require('../db');
const { getCourtIdByName } = require('../model/court');
const { getActIdByName } = require('../model/act');
const { getJudgementIdByName } = require('../model/judgement');
const { getPeopleIdByNif } = require('../model/people');
const { addProcessPeople } = require('../model/process-people');
const { DB_PEOPLE_TYPE_IDS, ACT_ID_AGGREGATORS_MAP } = require('../../lib/tools/constants');

function getTopAdmIns() {
    const query =
        `select people.name, people.nif, count(process.id) as process_nr from process
        left join process_people on process.id = process_people.process_id
        left join people on people.id = process_people.people_id
        where people.people_type_id = ?
        group by people.id
        order by process_nr desc;`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            connection.query(
                query,
                [1],
                (error, rows) => {
                    if (error) { return reject(error); }

                    resolve(rows);
                });
        });
    });
}

function insertProcess(process, processPeople) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            connection.beginTransaction(function (error) {
                if (error) { return reject(error); }

                const number = process.processDetails.number;
                const reference = process.reference;

                const court = process.court;
                const act = process.act;
                const judgement = process.processDetails.place;

                const species = process.species;
                const processDate = process.date;
                const date = moment(processDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

                return getCourtIdByName(connection, court)
                    .then((courtId) => {
                        return getActIdByName(connection, act)
                            .then((actId) => {
                                return { actId, courtId };
                            })
                            .catch((error) => reject(error));
                    })
                    .then(({ actId, courtId }) => {
                        return getJudgementIdByName(connection, judgement, courtId)
                            .then((judgementId) => {
                                return { actId, courtId, judgementId };
                            })
                            .catch((error) => reject(error));
                    })
                    .then(({ actId, courtId, judgementId }) => {
                        return addProcess(
                            connection, processPeople, number,
                            reference, courtId, actId,
                            judgementId, species, date
                        ).catch((error) => reject(error));
                    })
                    .then((processId) => {
                        return connection.commit((error) => {
                            if (error) {
                                connection.rollback(() => reject(error));
                            }
                            resolve(processId);
                        });
                    })
                    .catch((error) => {
                        return connection.rollback(() => reject(error));
                    })
                    .then(() => {
                        return connection.release();
                    });
            });
        });
    });
}

function addProcess(connection, processPeople, _number, _reference, _court_id, _act_id, _judgement_id, _species, _date) {
    return new Promise((resolve, reject) => {
        const _act_aggregator_id = ACT_ID_AGGREGATORS_MAP[_act_id];

        connection.query(
            'INSERT INTO `process` SET ?',
            {
                number: _number,
                reference: _reference,
                court_id: _court_id,
                act_id: _act_id,
                judgement_id: _judgement_id,
                species: _species,
                date: _date,
                act_aggregator_id: _act_aggregator_id
            },
            (error, rows) => {
                if (error) { return reject(error); }

                addPeople(connection, processPeople, rows.insertId)
                    .then((peopleIds) => {
                        addAllProcessPeople(connection, peopleIds, rows.insertId)
                            .then((personPeopleIds) => {
                                resolve(rows.insertId);
                            })
                            .catch((error) => {
                                connection.rollback(() => { return reject(error); });
                            });
                    })
                    .catch((error) => {
                        connection.rollback(() => { return reject(error); });
                    });
            }
        );
    });
}

function addAllProcessPeople(connection, peopleIds, processId) {
    return new Promise((resolve, reject) => {
        let insertPromise = Promise.resolve();
        let personPeopleIds = [];

        for (let i = 0; i < peopleIds.length; i++) {
            insertPromise = insertPromise.then(() => {
                let personId = peopleIds[i];

                addProcessPeople(connection, processId, personId)
                    .then((processPersonId) => {
                        personPeopleIds.push(processPersonId);

                        // Resolve when all ProcessPeople is inserted
                        if (personPeopleIds.length === peopleIds.length) {
                            resolve(personPeopleIds);
                        }
                    })
                    .catch((error) => {
                        connection.rollback(() => { return reject(error); });
                    });
            });
        }
    });
}

function addPeople(connection, processPeople, processId) {
    return new Promise((resolve, reject) => {
        let insertPromise = Promise.resolve();
        let peopleIds = [];

        for (let i = 0; i < processPeople.length; i++) {
            insertPromise = insertPromise.then(() => {
                let person = processPeople[i];
                let personTypeId = DB_PEOPLE_TYPE_IDS[person.type];

                return getPeopleIdByNif(connection, person.name, person.nif, personTypeId)
                    .then((personId) => {
                        peopleIds.push(personId);

                        // Resolve when all people is inserted
                        if (peopleIds.length === processPeople.length) {
                            resolve(peopleIds);
                        }
                    })
                    .catch((error) => {
                        const personNif = person && person.nif;
                        const errorMsg = error && error.sqlMessage;

                        console.log('Error inserting person: ' + personNif, errorMsg);
                        connection.rollback(() => { return reject(error); });
                    });
            });
        }
    });
}

module.exports = {
    insertProcess,
    getTopAdmIns
};