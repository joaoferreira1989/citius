$(document).ready(function () {
    let startDate = new Date();
    let endDate = new Date();

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

    $('#export').on('click', () => {
        const startDate = moment($('#date-range').data('daterangepicker').startDate._d).format('YYYY-MM-DD');
        const endDate = moment($('#date-range').data('daterangepicker').endDate._d).format('YYYY-MM-DD');

        fetchDocument(startDate, endDate);
    });
});

function fetchDocument(startdate, enddate) {
    window.open(`/citius?startdate=${startdate}&enddate=${enddate}`, '_blank');
}