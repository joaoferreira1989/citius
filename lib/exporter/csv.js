const excel = require('node-excel-export');
const styles = {
    headerYellow: {
        fill: {
            fgColor: {
                rgb: 'FFFF00'
            }
        },
        font: {
            color: {
                rgb: '000000'
            },
            sz: 14,
            bold: true,
            underline: false
        }
    }
};
const specification = {
    processNumber: {
        displayName: 'Nº Processo',
        headerStyle: styles.headerYellow,
        width: 150
    },
    date: {
        displayName: 'Data',
        headerStyle: styles.headerYellow,
        width: 100
    },
    act: {
        displayName: 'Acto',
        headerStyle: styles.headerYellow,
        width: 250
    },
    court: {
        displayName: 'Comarca',
        headerStyle: styles.headerYellow,
        width: 325
    },
    judgement: {
        displayName: 'Juizo',
        headerStyle: styles.headerYellow,
        width: 50
    },
    admin: {
        displayName: 'Administrador Insolvência',
        headerStyle: styles.headerYellow,
        width: 250
    },
    adminNif: {
        displayName: 'NIF ADM Insovencia',
        headerStyle: styles.headerYellow,
        width: 150
    },
};

function exportToExcel(dataset = [[],[],[]]) {
    return excel.buildExport([
        {
            name: 'Nomeações',
            heading: [],
            merges: [],
            specification: specification,
            data: dataset[0]
        },
        {
            name: 'Destituições',
            heading: [],
            merges: [],
            specification: specification,
            data: dataset[1]
        },
        {
            name: 'Sentenças',
            heading: [],
            merges: [],
            specification: specification,
            data: dataset[2]
        }
    ]);
}

module.exports = {
    exportToExcel
}