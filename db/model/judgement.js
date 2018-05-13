const { pool } = require('../db');

function getJudgementIdByName(connection, name, courtId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `judgement` WHERE `name` = ?', [name], (error, rows) => {
            if (error) { return reject(error); }

            if (rows.length > 0) {
                resolve(rows[0].id);
            } else {
                addJudgement(connection, name, courtId)
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

function addJudgement(connection, nameValue, courtIdValue) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `judgement` SET ?',
            {
                name: nameValue,
                court_id: courtIdValue
            },
            (error, rows) => {
                if (error) { return reject(error); }

                resolve(rows.insertId);
            }
        );
    });
}

function getAllJudgements() {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            connection.query(
                `SELECT * FROM judgement`,
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
    getJudgementIdByName,
    getAllJudgements
};