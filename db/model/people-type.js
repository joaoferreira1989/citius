const { connection } = require('../db');

function getAllPeopleTypes() {
    return connection.query('SELECT * from `people_type`', function (error, results) {
        if (error) throw error;

        console.log('results', results);
    });
}

module.exports = {
    getAllPeopleTypes
};