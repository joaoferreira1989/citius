$(document).ready(function () {
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    const options = {
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
                type: "line",
                name: "",
                showInLegend: true,
                yValueFormatString: "#,##0",
                dataPoints: []
            }]
    };

    function buildDataPoints(result) {
        return result.map((value) => {
            return {
                x: new Date(value.date),
                y: value.count
            };
        });
    }

    $.ajax({
        url: '/processes/get?actaggregatorid=1',
        success: (result) => {
            options.title.text = 'Insolvências';
            options.data[0].dataPoints = buildDataPoints(result);
            options.data[0].name = 'Insolvências';
            $("#processesChartContainer1").CanvasJSChart(options);
        }
    });

    $.ajax({
        url: '/processes/get?actaggregatorid=2',
        success: (result) => {
            options.title.text = 'Substituições';
            options.data[0].dataPoints = buildDataPoints(result);
            options.data[0].name = 'Substituições';
            $("#processesChartContainer2").CanvasJSChart(options);
        }
    });

    $.ajax({
        url: '/processes/get?actaggregatorid=3',
        success: (result) => {
            options.title.text = 'PER-PEAP';
            options.data[0].dataPoints = buildDataPoints(result);
            options.data[0].name = 'PER-PEAP';
            $("#processesChartContainer3").CanvasJSChart(options);
        }
    });

    $.ajax({
        url: '/processes/get?actaggregatorid=4',
        success: (result) => {
            options.title.text = 'Insuficiência de Massa';
            options.data[0].dataPoints = buildDataPoints(result);
            options.data[0].name = 'Insuficiência de Massa';
            $("#processesChartContainer4").CanvasJSChart(options);
        }
    });
});