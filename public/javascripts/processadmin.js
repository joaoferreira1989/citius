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
    data: [
        {
            type: "column",
            color: "#3a87ad",
            name: "",
            showInLegend: true,
            yValueFormatString: "#,##0",
            dataPoints: []
        }
    ]
};

$(document).ready(function () {
    initAdminsSelectbox();
    initDatePicker();
    fetchGraphsData('2018-01-01', '2018-12-31');
});

function fetchGraphsData(startDate, endDate) {
    $.ajax({
        url: '/processes/get?actaggregatorid=1&startdate=' + startDate + '&enddate=' + endDate,
        success: (result) => {
            graphOptions.title.text = 'Insolvências';
            graphOptions.data[0].dataPoints = buildDataPoints(result);
            graphOptions.data[0].name = 'Insolvências';
            $("#processesChartContainer1").CanvasJSChart(graphOptions);
        }
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

            $('#admins-select').select2({
                multiple: true,
                data: dataSource
            });
        }
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
            fetchGraphsData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        }
    );
}

function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

function buildDataPoints(result) {
    return result.map((value) => {
        return {
            x: new Date(value.date),
            y: value.count
        };
    });
}