const { connection } = require('../db');
const { getCourtIdByName } = require('../model/court');

function insertProcess(processData) {
    connection.beginTransaction(function (err) {
        if (err) { throw err; }

        const process = processData.process;

        const number = process.processDetails.number;
        const reference = process.reference;

        const court = process.court;
        const act = process.act;
        const judgement = process.processDetails.place;

        const species = process.species;
        const date = process.date;

        getCourtIdByName(connection, court)
            .then((courtId) => {
                console.log('getCourtIdByName', result);
            })
            .catch((error) => {
                connection.rollback(() => { throw error; });
            });
    });
}

module.exports = {
    insertProcess
};