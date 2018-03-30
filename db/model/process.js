const moment = require('moment');
const { pool } = require('../db');
const { getCourtIdByName } = require('../model/court');
const { getActIdByName } = require('../model/act');
const { getJudgementIdByName } = require('../model/judgement');

function insertProcess(process) {
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
                const date = moment(new Date(processDate)).format('YYYY-MM-DD');

                return getCourtIdByName(connection, court)
                    .then((courtId) => {
                        getActIdByName(connection, act)
                            .then((actId) => {
                                getJudgementIdByName(connection, judgement, courtId)
                                    .then((judgementId) => {
                                        addProcess(connection, number, reference, courtId, actId, judgementId, species, date)
                                            .then((processId) => {
                                                connection.commit((error) => {
                                                    if (error) {
                                                        connection.rollback(() => { return reject(error); });
                                                    }

                                                    resolve(processId);
                                                });
                                            })
                                            .catch((error) => {
                                                connection.rollback(() => { return reject(error); });
                                            });
                                    })
                                    .catch((error) => {
                                        connection.rollback(() => { return reject(error); });
                                    });
                            })
                            .catch((error) => {
                                connection.rollback(() => { return reject(error); });
                            });
                    })
                    .catch((error) => {
                        connection.rollback(() => { return reject(error); });
                    })
                    .then(() => {
                        connection.release();
                    });
            });
        });
    });
}

function addProcess(connection, _number, _reference, _court_id, _act_id, _judgement_id, _species, _date) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `process` SET ?',
            {
                number: _number,
                reference: _reference,
                court_id: _court_id,
                act_id: _act_id,
                judgement_id: _judgement_id,
                species: _species,
                date: _date
            },
            (error, rows) => {
                if (error) { return reject(error); }

                resolve(rows.insertId);
            }
        );
    });
}

module.exports = {
    insertProcess
};