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
            text: 'Número de insolvências'
        },
        axisX: {
            valueFormatString: "MMM-DD"
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
                name: "Número de insolvências",
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
        url: '/processes/get',
        success: (result) => {
            console.log(result);
            options.data[0].dataPoints = buildDataPoints(result);
            $("#processesChartContainer").CanvasJSChart(options);
        }
    });
});