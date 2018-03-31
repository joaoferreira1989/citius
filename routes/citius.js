const express = require('express');
const router = express.Router();
const { PEOPLE_TYPES } = require('../lib/tools/constants');
const { doFetch } = require('../lib/req/citius');
const { exportToExcel } = require('../lib/exporter/csv');

router.get('/', function (req, res, next) {
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;
    const actsList = [
        'Pub. - Sentença Declaração Insolvência',
        'Pub. - Destituição / Nomeação Administrador',
        'Pub. - Nomeação Administrador Provisório'
    ];

    doFetch(initialDate, finalDate, actsList).then((response) => {
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
        const date = new Date();
        const timestamp = date.getTime();
        const report = exportToExcel(csvData);

        res.attachment('report' + timestamp + '.xlsx');
        return res.send(report);
    });
});

module.exports = router;
