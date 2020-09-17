const { DB_PEOPLE_TYPE_IDS } = require('../../lib/tools/constants');
const { pool } = require('../db');

function getPeopleIdByNif(connection, name, nif, peopleTypeId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `people` WHERE `nif` = ? AND `people_type_id` = ?', [nif, peopleTypeId], (error, rows) => {
            if (error) { return reject(error); }

            if (rows.length > 0) {
                resolve(rows[0].id);
            } else {
                addPeople(connection, name, nif, peopleTypeId)
                    .then((insertId) => {
                        resolve(insertId);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            }
        });
    });
}

function getAllAdmIns(connection) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            connection.query(
                `SELECT * FROM people WHERE people_type_id = ?`,
                [DB_PEOPLE_TYPE_IDS.ADMINISTRADOR_INSOLVENCIA],
                (error, rows) => {
                    if (error) { return reject(error); }

                    connection.release();
                    resolve(rows);
                });
        });
    });
}

function addPeople(connection, _name, _nif, _peopleTypeId) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `people` SET ?',
            {
                name: _name,
                nif: _nif,
                people_type_id: _peopleTypeId
            },
            (error, rows) => {
                if (error) { return reject(error); }

                resolve(rows.insertId);
            });
    });
}

module.exports = {
    getPeopleIdByNif,
    getAllAdmIns
};