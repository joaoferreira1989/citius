$(document).ready(function () {
    $.fn.dataTable.ext.errMode = function (_, __, error) {
        console.error(error);
    };

    $('#table-1').DataTable({
        ajax: '/admins/get-all?actaggregatorid=1',
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'NIF', data: 'nif' },
            { title: 'NR', data: 'process_nr' }
        ],
        order: [[2, "desc"]]
    });

    $('#table-2').DataTable({
        ajax: '/admins/get-all?actaggregatorid=2',
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'NIF', data: 'nif' },
            { title: 'NR', data: 'process_nr' }
        ],
        order: [[2, "desc"]]
    });

    $('#table-3').DataTable({
        ajax: '/admins/get-all?actaggregatorid=3',
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'NIF', data: 'nif' },
            { title: 'NR', data: 'process_nr' }
        ],
        order: [[2, "desc"]]
    });

    $('#table-4').DataTable({
        ajax: '/admins/get-all?actaggregatorid=4',
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'NIF', data: 'nif' },
            { title: 'NR', data: 'process_nr' }
        ],
        order: [[2, "desc"]]
    });
});