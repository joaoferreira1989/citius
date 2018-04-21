const { pool } = require('../db');

function getCourtIdByName(connection, name) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `court` WHERE `name` = ?', [name], (error, rows) => {
            if (error) { return reject(error); }

            if (rows.length > 0) {
                resolve(rows[0].id);
            } else {
                addCourt(connection, name)
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

function addCourt(connection, nameValue) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO `court` SET ?', { name: nameValue }, (error, rows) => {
            if (error) { return reject(error); }

            resolve(rows.insertId);
        });
    });
}

function getAllCourts(connection) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            connection.query(
                `SELECT * FROM court`,
                [],
                (error, rows) => {
                    if (error) { return reject(error); }

                    connection.release();
                    resolve(rows);
                });
        });
    });
}

module.exports = {
    getCourtIdByName,
    getAllCourts
};