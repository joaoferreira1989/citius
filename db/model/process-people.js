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

/**
 * Get Process people duplicates
 *
SELECT pp.process_id, pp.people_id FROM process_people pp
GROUP BY pp.process_id, pp.people_id
HAVING COUNT(1) > 1
ORDER BY pp.process_id, pp.people_id;


 * Delete Process people duplicates
 *
delete process_people from process_people
left join (
    select min(id) as minid from process_people
    group by process_id, people_id) pp2
on process_people.id = pp2.minid
where pp2.minid is null;

 */