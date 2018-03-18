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

function exportToExcel(dataset = [[], [], []]) {
    let exportDataSets = [[], [], []];
    for (let i = 0; i < dataset.length; i+=3) {
        exportDataSets[0] = exportDataSets[0].concat(dataset[i]);
        exportDataSets[1] = exportDataSets[1].concat(dataset[i + 1]);
        exportDataSets[2] = exportDataSets[2].concat(dataset[i + 2]);
    }

    return excel.buildExport([
        {
            name: 'Insolvências',
            heading: [],
            merges: [],
            specification: specification,
            data: exportDataSets[0]
        },
        {
            name: 'Substituições',
            heading: [],
            merges: [],
            specification: specification,
            data: exportDataSets[1]
        },
        {
            name: 'PER-PEAP',
            heading: [],
            merges: [],
            specification: specification,
            data: exportDataSets[2]
        }
    ]);
}

module.exports = {
    exportToExcel
}