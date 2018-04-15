const graphOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
        text: ''
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
    data: []
};

$(document).ready(function () {
    initAdminsSelectbox();
    initDatePicker();

    $('#search').on('click', () => {
        const adminIds = $('#admins-select').val();
        const graphData = adminIds.map((id) => {
            return getAdminInsProcesses(id);
        });

        Promise.all(graphData)
            .then((response) => {
                graphOptions.title.text = 'Insolvências';

                response.forEach((admData, i) => {
                    const dataModel = {
                        type: "line",
                        color: "#3a87ad",
                        name: "" + i,
                        showInLegend: true,
                        yValueFormatString: "#,##0",
                        dataPoints: buildGraphLine(admData)
                    };

                    graphOptions.data.push(dataModel);
                });

                $("#processesChartContainer1").CanvasJSChart(graphOptions);
            });
    });
});

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

            $('#admins-select').select2({
                multiple: true,
                data: dataSource
            });
        }
    });
}

function getAdminInsProcesses(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/processadmin/get-admin-ins-processes?id=' + id,
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
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        },
        function (start, end, label) {
            //fetchGraphsData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        }
    );
}

function buildGraphLine(adminData) {
    const datesList = enumerateDaysBetweenDates('2015-05-01', '2018-04-15');
    let sum = 0;

    return datesList.map((date) => {
        const nextProcess = adminData[0];
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
