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

module.exports = {
    getJudgementIdByName
};