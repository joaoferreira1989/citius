function addProcessPeople(connection, _processId, _peopleId) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `process_people` SET ?',
            {
                process_id: _processId,
                people_id: _peopleId
            },
            (error, rows) => {
                if (error) { return reject(error); }

                resolve(rows.insertId);
            });
    });
}

module.exports = {
    addProcessPeople
};