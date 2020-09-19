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
const specification1 = {
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
    admin1: {
        displayName: 'Administrador Insolvência',
        headerStyle: styles.headerYellow,
        width: 250
    },
    admin1Nif: {
        displayName: 'NIF ADM Insovencia',
        headerStyle: styles.headerYellow,
        width: 150
    },
    insolv1: {
        displayName: 'Insolvente 1',
        headerStyle: styles.headerYellow,
        width: 250
    },
    insolv1Nif: {
        displayName: 'NIF Insolvente 1',
        headerStyle: styles.headerYellow,
        width: 150
    },
    insolv2: {
        displayName: 'Insolvente 2',
        headerStyle: styles.headerYellow,
        width: 250
    },
    insolv2Nif: {
        displayName: 'NIF Insolvente 1',
        headerStyle: styles.headerYellow,
        width: 150
    }
};
const specification2 = {
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
    admin1: {
        displayName: 'Administrador Insolvência [1]',
        headerStyle: styles.headerYellow,
        width: 300
    },
    admin1Nif: {
        displayName: 'NIF ADM Insovencia [1]',
        headerStyle: styles.headerYellow,
        width: 175
    },
    insolv1: {
        displayName: 'Insolvente 1',
        headerStyle: styles.headerYellow,
        width: 250
    },
    insolv1Nif: {
        displayName: 'NIF Insolvente 1',
        headerStyle: styles.headerYellow,
        width: 150
    },
    insolv2: {
        displayName: 'Insolvente 2',
        headerStyle: styles.headerYellow,
        width: 250
    },
    insolv2Nif: {
        displayName: 'NIF Insolvente 1',
        headerStyle: styles.headerYellow,
        width: 150
    }
};
const specification3 = {
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
    admin1: {
        displayName: 'Administrador Insolvência',
        headerStyle: styles.headerYellow,
        width: 250
    },
    admin1Nif: {
        displayName: 'NIF ADM Insovencia',
        headerStyle: styles.headerYellow,
        width: 150
    },
    insolv1: {
        displayName: 'Devedor 1',
        headerStyle: styles.headerYellow,
        width: 250
    },
    insolv1Nif: {
        displayName: 'NIF Devedor 1',
        headerStyle: styles.headerYellow,
        width: 150
    },
    insolv2: {
        displayName: 'Devedor 2',
        headerStyle: styles.headerYellow,
        width: 250
    },
    insolv2Nif: {
        displayName: 'NIF Devedor 1',
        headerStyle: styles.headerYellow,
        width: 150
    }
};

function exportToExcel(dataset = [[], [], [], []]) {
    let exportDataSets = [[], [], [], []];
    for (let i = 0; i < dataset.length; i+=4) {
        exportDataSets[0] = exportDataSets[0].concat(dataset[i]);
        exportDataSets[1] = exportDataSets[1].concat(dataset[i + 1]);
        exportDataSets[2] = exportDataSets[2].concat(dataset[i + 2]);
        exportDataSets[3] = exportDataSets[3].concat(dataset[i + 3]);
    }

    return excel.buildExport([
        {
            name: 'Insolvências',
            heading: [],
            merges: [],
            specification: specification1,
            data: exportDataSets[0]
        },
        {
            name: 'Substituições',
            heading: [],
            merges: [],
            specification: specification2,
            data: exportDataSets[1]
        },
        {
            name: 'PER-PEAP',
            heading: [],
            merges: [],
            specification: specification3,
            data: exportDataSets[2]
        },
        {
            name: 'Insuficiência de Massa',
            heading: [],
            merges: [],
            specification: specification1,
            data: exportDataSets[3]
        }
    ]);
}

module.exports = {
    exportToExcel
}