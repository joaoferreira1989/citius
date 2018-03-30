function getPeopleIdByNif(connection, name, nif, peopleTypeId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `people` WHERE `nif` = ?', [nif], (error, rows) => {
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
    getPeopleIdByNif
};