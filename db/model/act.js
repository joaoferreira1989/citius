function getActIdByName(connection, name) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `act` WHERE `name` = ?', [name], (error, rows) => {
            if (error) { return reject(error); }

            if (rows.length > 0) {
                console.log('found act', rows);
                resolve(rows[0].id);
            } else {
                console.log('not found act', rows);
                addAct(connection, name)
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

function addAct(connection, nameValue) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO `act` SET ?', { name: nameValue }, (error, rows) => {
            if (error) { return reject(error); }

            resolve(rows.insertId);
        });
    });
}

module.exports = {
    getActIdByName
};