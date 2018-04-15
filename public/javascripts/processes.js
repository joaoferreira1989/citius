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

    $.ajax({
        url: '/processes/get?actaggregatorid=2&startdate=' + startDate + '&enddate=' + endDate,
        success: (result) => {
            graphOptions.title.text = 'Substituições';
            graphOptions.data[0].dataPoints = buildDataPoints(result);
            graphOptions.data[0].name = 'Substituições';
            $("#processesChartContainer2").CanvasJSChart(graphOptions);
        }
    });

    $.ajax({
        url: '/processes/get?actaggregatorid=3&startdate=' + startDate + '&enddate=' + endDate,
        success: (result) => {
            graphOptions.title.text = 'PER-PEAP';
            graphOptions.data[0].dataPoints = buildDataPoints(result);
            graphOptions.data[0].name = 'PER-PEAP';
            $("#processesChartContainer3").CanvasJSChart(graphOptions);
        }
    });

    $.ajax({
        url: '/processes/get?actaggregatorid=4&startdate=' + startDate + '&enddate=' + endDate,
        success: (result) => {
            graphOptions.title.text = 'Insuficiência de Massa';
            graphOptions.data[0].dataPoints = buildDataPoints(result);
            graphOptions.data[0].name = 'Insuficiência de Massa';
            $("#processesChartContainer4").CanvasJSChart(graphOptions);
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
            fetchGraphsData(start.format('DD-MM-YYYY'), end.format('DD-MM-YYYY'));
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