const express = require('express');
const router = express.Router();
const moment = require('moment');
const { exportToExcel } = require('../lib/exporter/csv');
const { fetchExcelProcesses } = require('../db/model/process');

router.get('/', function (req, res, next) {
    const initialDate = req.query.startdate;
    const finalDate = req.query.enddate;

    const processesActAggr1 = fetchExcelProcesses(initialDate, finalDate, 1);
    const processesActAggr2 = fetchExcelProcesses(initialDate, finalDate, 2);
    const processesActAggr3 = fetchExcelProcesses(initialDate, finalDate, 3);
    const processesActAggr4 = fetchExcelProcesses(initialDate, finalDate, 4);

    return Promise.all([processesActAggr1, processesActAggr2, processesActAggr3, processesActAggr4])
        .then((response) => {
            const csvData = response.map((act) => {
                return act.map((process) => {
                    const judgementSplit = process.judgement_name.split(' ');
                    const judgementNr = judgementSplit[judgementSplit.length - 1];

                    return {
                        processNumber: process.process_nr,
                        date: moment(process.process_date).format('DD-MM-YYYY'),
                        act: process.act_name,
                        court: process.court_name,
                        judgement: /^[0-9]+$/.test(judgementNr) ? judgementNr : '',
                        admin1: process.admin_name,
                        admin1Nif: process.people_nif
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
