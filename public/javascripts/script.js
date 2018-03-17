$(document).ready(function () {
    let startDate = new Date();
    let endDate = new Date();

    $('#date-range').daterangepicker(
        {
            locale: {
                format: 'DD-MM-YYYY'
            },
            todayHighlight: true,
            endDate: moment(),
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        },
        function (start, end, label) {
            startDate = start.format('DD-MM-YYYY');
            endDate = end.format('DD-MM-YYYY');

            console.log('Fetching from ' + startDate + ' to ' + endDate);

            fetchDocument(startDate, endDate);
        }
    );
});

function fetchDocument(startdate, enddate) {
    window.open(`/citius?startdate=${startdate}&enddate=${enddate}`, '_blank');
}