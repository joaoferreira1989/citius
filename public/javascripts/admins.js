$(document).ready(function () {
    $.fn.dataTable.ext.errMode = function (_, __, error) {
        console.error(error);
    };

    initDatePicker();
    fetchTablesDate();

    $('#search').on('click', () => {
        fetchTablesDate();
    });
});

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
                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
            }
        },
        function (start, end, label) { }
    );
}

const details1 = {};
const details2 = {};
const details3 = {};
const details4 = {};

function fetchTablesDate() {
    const startDate = moment($('#date-range').data('daterangepicker').startDate._d).format('YYYY-MM-DD');
    const endDate = moment($('#date-range').data('daterangepicker').endDate._d).format('YYYY-MM-DD');

    initTable('#table-1', 1, details1, startDate, endDate);
    initTable('#table-2', 2, details2, startDate, endDate);
    initTable('#table-3', 3, details3, startDate, endDate);
    initTable('#table-4', 4, details4, startDate, endDate);
}

function initTable(tableSelector, actaggregatorid, detailsObj, startDate, endDate) {
    $(tableSelector).DataTable({
        destroy: true,
        ajax: '/admins/get-all?actaggregatorid=' + actaggregatorid + '&startdate=' + startDate + '&enddate=' + endDate,
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'NIF', data: 'nif' },
            { title: 'NR', data: 'process_nr' }
        ],
        order: [[2, "desc"]]
    });

    $(tableSelector + ' tbody').off('click').on('click', 'tr', function () {
        const table = $(tableSelector).DataTable();
        const rowNif = table.row(this).data().nif;

        if ($(this).hasClass('selected')) {
            delete detailsObj[rowNif];

            $(this).removeClass('selected');
        } else {
            detailsObj[rowNif] = {
                nif: rowNif
            };

            $(this).addClass('selected');
        }

        console.log(detailsObj);
    });
}