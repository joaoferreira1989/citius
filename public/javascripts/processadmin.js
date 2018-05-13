let adminsList = [];
let courtsList = [];

$(document).ready(function () {
    initAdminsSelectbox();
    initCourtsSelectbox();
    initJudgementsSelectbox();
    initDatePicker();

    $('#search').on('click', () => {
        const adminIds = $('#admins-select').val();
        const courtIds = $('#courts-select').val();
        const judgementIds = $('#judgements-select').val();
        const startDate = moment($('#date-range').data('daterangepicker').startDate._d).format('YYYY-MM-DD');
        const endDate = moment($('#date-range').data('daterangepicker').endDate._d).format('YYYY-MM-DD');

        loadGraphData(adminIds, courtIds, judgementIds, 1, startDate, endDate, 'Insolvências')
            .then((result1) => {
                $("#processesChartContainer1").CanvasJSChart(result1);
            });
        loadGraphData(adminIds, courtIds, judgementIds, 2, startDate, endDate, 'Substituições')
            .then((result2) => {
                $("#processesChartContainer2").CanvasJSChart(result2);
            });
        loadGraphData(adminIds, courtIds, judgementIds, 3, startDate, endDate, 'PER-PEAP')
            .then((result) => {
                $("#processesChartContainer3").CanvasJSChart(result);
            });
        loadGraphData(adminIds, courtIds, judgementIds, 4, startDate, endDate, 'Insuficiência de Massa')
            .then((result) => {
                $("#processesChartContainer4").CanvasJSChart(result);
            });
    });
});

function loadGraphData(adminIds, courtIds, judgementIds, actAggId, startDate, endDate, title) {
    const graphData = adminIds.map((id) => {
        return getAdminInsProcesses(id, actAggId, courtIds, judgementIds, startDate, endDate).then((data) => {
            return { id, data };
        });
    });

    return Promise.all(graphData)
        .then((response) => {
            const dataModel = response.map(({ id, data: admData }, i) => {
                const adm = adminsList.find((adm) => {
                    return adm.id === parseInt(id);
                });

                return {
                    type: "line",
                    name: adm && adm.text || '' + i,
                    showInLegend: true,
                    yValueFormatString: "#,##0",
                    dataPoints: buildGraphLine(admData, startDate, endDate)
                };
            });

            return {
                animationEnabled: true,
                theme: 'light2',
                title: {
                    text: title
                },
                axisX: {
                    valueFormatString: "DD-MMM-YY"
                },
                axisY: {},
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    itemclick: toggleDataSeries
                },
                data: dataModel
            };
        });
}

function initAdminsSelectbox() {
    $.ajax({
        url: '/processadmin/get-admins',
        success: (results) => {
            const dataSource = results.map((admin) => {
                return {
                    id: admin.id,
                    text: admin.name
                };
            });
            adminsList = dataSource;

            $('#admins-select').select2({
                placeholder: 'Administradores de insolvência',
                multiple: true,
                data: dataSource
            });
        }
    });
}

function initCourtsSelectbox() {
    $.ajax({
        url: '/processadmin/get-courts',
        success: (results) => {
            const dataSource = results.map((court) => {
                return {
                    id: court.id,
                    text: court.name
                };
            });
            courtsList = dataSource;

            $('#courts-select').select2({
                placeholder: 'Comarcas',
                multiple: true,
                data: dataSource
            });
        }
    });
}

function initJudgementsSelectbox() {
    $.ajax({
        url: '/accprocessadmin/get-judgements',
        success: (results) => {
            const dataSource = results.map((court) => {
                return {
                    id: court.id,
                    text: court.name
                };
            });
            judgementsList = dataSource;

            $('#judgements-select').select2({
                placeholder: 'Juizos',
                multiple: true,
                data: dataSource
            });
        }
    });
}

function getAdminInsProcesses(id, actAggId, courtIds, judgementIds, startDate, endDate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/processadmin/get-admin-ins-processes?id=' + id + '&actAggId=' + actAggId + '&courtIds=' + courtIds + '&judgementids=' + judgementIds + '&startdate=' + startDate + '&enddate=' + endDate,
            success: (results) => {
                resolve(results);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

function initDatePicker() {
    $('#date-range').daterangepicker(
        {
            locale: {
                format: 'DD-MM-YYYY'
            },
            todayHighlight: true,
            startDate: moment().subtract(30, 'days'),
            endDate: moment(),
            ranges: {
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                '2016': [moment('2016-01-01'), moment('2016-12-31')],
                '2015': [moment('2015-01-01'), moment('2015-12-31')]
            }
        },
        function (start, end, label) {}
    );
}

function buildGraphLine(adminData, startDate, endDate) {
    const datesList = enumerateDaysBetweenDates(startDate, endDate);
    let sum = 0;

    return datesList.map((date) => {
        const nextProcess = adminData[0] || { date: '' };
        const isCurrentDate = date === nextProcess.date.substr(0, 10);

        if (isCurrentDate) {
            adminData.shift();
            sum += nextProcess.processes_nr;
        }

        return {
            x: new Date(date),
            y: sum
        };
    });
}

function enumerateDaysBetweenDates(startDate, endDate) {
    startDate = moment(startDate);
    endDate = moment(endDate);

    const now = startDate;
    const dates = [];

    while (now.isBefore(endDate) || now.isSame(endDate)) {
        dates.push(now.format('YYYY-MM-DD'));
        now.add(1, 'days');
    }
    return dates;
};

function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}
