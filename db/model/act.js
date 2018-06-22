function getActIdByName(connection, name) {
    return new Promise((resolve, reject) => {
        let actName = name;
        if (actName.startsWith('Ato: ')) {
            actName = name.replace('Ato: ', '');
        }

        connection.query('SELECT * FROM `act` WHERE `name` = ?', [actName], (error, rows) => {
            if (error) { return reject(error); }

            if (rows.length > 0) {
                resolve(rows[0].id);
            } else {
                addAct(connection, actName)
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