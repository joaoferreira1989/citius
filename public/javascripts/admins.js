$(document).ready(function () {
    $.fn.dataTable.ext.errMode = function (_, __, error) {
        console.error(error);
    };

    $('#table-1').DataTable({
        ajax: '/admins/get-all',
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'NIF', data: 'nif' },
            { title: 'NR', data: 'process_nr' }
        ],
        order: [[2, "desc"]]
    });
});