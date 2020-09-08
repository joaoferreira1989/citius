const express = require('express');
const router = express.Router();
const moment = require('moment');
const { exportToExcel } = require('../lib/exporter/csv');
const { fetchExcelProcesses } = require('../db/model/process');
const { DB_PEOPLE_TYPE_IDS } = require('../lib/tools/constants');

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

                    const peopleNames = process.admin_name.split('||');
                    const peopleNIfs = process.people_nif.split('||');
                    const peopleTypeIds = process.people_type_id.split('||');

                    let admin1, admin1Nif;
                    let insolv1, insolv1Nif;
                    let insolv2, insolv2Nif;


                    for (let [index, peopleTypeId] of peopleTypeIds.entries()) {
                        if (peopleTypeId == DB_PEOPLE_TYPE_IDS.ADMINISTRADOR_INSOLVENCIA) {
                            admin1 = peopleNames[index];
                            admin1Nif = peopleNIfs[index];
                        }

                        if (peopleTypeId == DB_PEOPLE_TYPE_IDS.INSOLVENTE) {
                            if (!insolv1) {
                                insolv1 = peopleNames[index];
                                insolv1Nif = peopleNIfs[index];
                            } else {
                                insolv2 = peopleNames[index];
                                insolv2Nif = peopleNIfs[index];
                            }
                        }
                    };

                    const row = {
                        processNumber: process.process_nr,
                        date: moment(process.process_date).format('DD-MM-YYYY'),
                        act: process.act_name,
                        court: process.court_name,
                        judgement: /^[0-9]+$/.test(judgementNr) ? judgementNr : '',
                        admin1,
                        admin1Nif,
                        insolv1,
                        insolv1Nif,
                        insolv2,
                        insolv2Nif
                    };

                    console.log(row);

                    return row;
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
