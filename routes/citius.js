const express = require('express');
const router = express.Router();
const { PEOPLE_TYPES } = require('../lib/tools/constants');
const { doFetch } = require('../lib/req/citius');
const { exportToExcel } = require('../lib/exporter/csv');

router.get('/', function (req, res, next) {
    const initialDate = '03-01-2018';
    const finalDate = '03-01-2018';

    doFetch(initialDate, finalDate).then((response) => {
        const csvData = response.map((act) => {
            return act.map(({ process, people }) => {
                const admin = people.find((person) => {
                    return person.type === PEOPLE_TYPES.ADMINISTRADOR_INSOLVENCIA;
                });

                return {
                    processNumber: process.processDetails.number,
                    date: process.date,
                    act: process.act,
                    court: process.court,
                    judgement: process.processDetails.judgement,
                    admin: admin.name,
                    adminNif: admin.nif
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
