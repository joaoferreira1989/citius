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

let details1 = {};
let details2 = {};
let details3 = {};
let details4 = {};

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
        const rowName = table.row(this).data().name;

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            delete detailsObj[rowNif];
            renderProcesses(tableSelector + '-data', detailsObj);
        } else {
            getAdminDetails(rowNif, actaggregatorid, startDate, endDate).then((result) => {
                $(this).addClass('selected');
                detailsObj[rowNif] = {
                    nif: rowNif,
                    name: rowName,
                    processes: result
                };
                renderProcesses(tableSelector + '-data', detailsObj);
            });
        }
    });

    $(tableSelector + '-data').html('');
    details1 = {};
    details2 = {};
    details3 = {};
    details4 = {};
}

function renderProcesses(selector, data) {
    const processMarkup = Object.keys(data).reduce((acc, nif) => {
        const adminData = data[nif];
        return acc + renderCard(adminData.name, adminData.nif, adminData.processes);
    }, '');

    $(selector).html(processMarkup);
}

function renderCard(name, nif, processesList) {
    const cardProcesses = renderCardProcesses(processesList);
    return `<div class="panel panel-default">
        <div class="panel-heading">${name} - NIF: ${nif}</div>
        ${cardProcesses}
    </div>`;
}

function renderCardProcesses(processesList) {
    const tBody = processesList.reduce((acc, process, index) => {
        return acc +=
            `<tr>
                <th scope="row">${index + 1}</th>
                <td>${process.process_number}</td>
                <td>${process.process_date.substr(0, 10)}</td>
                <td>${process.court_name}</td>
                <td>${process.judgement_name}</td>
            </tr>`;
    }, '');

    return `<table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Número</th>
                <th>Data</th>
                <th>Tribunal</th>
                <th>Juízo</th>
            </tr>
        </thead>
        <tbody>
            ${tBody}
        </tbody>
    </table>`;
}

function getAdminDetails(nif, actAggId, startdate, enddate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/admins/get-admin-details?nif=' + nif + '&actAggId=' + actAggId + '&startdate=' + startdate + '&enddate=' + enddate,
            success: (results) => {
                resolve(results);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}