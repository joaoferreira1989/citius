const express = require('express');
const router = express.Router();
const { PEOPLE_TYPES } = require('../lib/tools/constants');
const { doFetch } = require('../lib/req/citius');
const { writeToFile } = require('../lib/tools/fs-helper');

router.get('/', function (req, res, next) {
    const initialDate = '01-02-2018';
    const finalDate = '01-02-2018';

    doFetch(initialDate, finalDate).then((response) => {
        const csvData = response.map((act) => {
            return act.map(({ process, people }) => {
                const admins = people.reduce((acc, person) => {
                    if (person.type === PEOPLE_TYPES.ADMINISTRADOR_INSOLVENCIA) {
                        acc.push(person);
                    }

                    return acc;
                }, []) || [];

                return {
                    processNumber: process.processDetails.number,
                    date: process.date,
                    act: process.act,
                    court: process.court,
                    judgement: process.processDetails.judgement,
                    admin1: admins[0] ? admins[0].name : undefined,
                    admin1Nif: admins[0] ? admins[0].nif : undefined,
                    admin2: admins[1] ? admins[1].name : undefined,
                    admin2Nif: admins[1] ? admins[1].nif : undefined
                };
            });
        });

        writeToFile(JSON.stringify(response, null, 4));

        return res.send('done');
    });
});

module.exports = router;
