const PEOPLE_TYPES = {
    UNKNOWN: 'UNKNOWN',
    DEVEDOR: 'DEVEDOR',
    ADMINISTRADOR_INSOLVENCIA: 'ADMINISTRADOR_INSOLVENCIA',
    CREDOR: 'CREDOR',
    INSOLVENTE: 'INSOLVENTE'
};

const DB_PEOPLE_TYPE_IDS = {
    ADMINISTRADOR_INSOLVENCIA: 1,
    INSOLVENTE: 2,
    CREDOR: 3,
    DEVEDOR: 4,
    UNKNOWN: 5
};

const ACTS = {
    'Anúncio - destituição e nomeação - Portal Citius': {
        id: 1,
        aggregatorId: 2
    },
    'Anúncio destituição e nomeação - Portal Citius': {
        id: 2,
        aggregatorId: 2
    },
    'Pub. - Destituição / Nomeação Administrador': {
        id: 3,
        aggregatorId: 2
    },
    'Anúncio PEAP - artº 34 - P Citius': {
        id: 4,
        aggregatorId: 3
    },
    'Anúncio PER - artº 34 - P Citius': {
        id: 5,
        aggregatorId: 3
    },
    'Anúncio sentença (PER) - Portal Citius': {
        id: 6,
        aggregatorId: 3
    },
    'Pub. - Nomeação Administrador Provisório': {
        id: 7,
        aggregatorId: 3
    },
    'Anúncio sent Insolvência c/ Ass.Cred - P Citius': {
        id: 8,
        aggregatorId: 1
    },
    'Anúncio sent Insolvência c/ Ass.Cred. - P Citius': {
        id: 9,
        aggregatorId: 1
    },
    'Anúncio sent Insolvência s/ Ass. Cred. - P Citius': {
        id: 10,
        aggregatorId: 1
    },
    'Anúncio sent Insolvência s/ Ass.Cred - P Citius': {
        id: 11,
        aggregatorId: 1
    },
    'Anúncio sent Insolvência s/ Ass.Cred. - P Citius': {
        id: 12,
        aggregatorId: 1
    },
    'Pub. - Sentença Declaração Insolvência': {
        id: 13,
        aggregatorId: 1
    },
    'Anúncio sent Insolvência Insuf Massa - P Citius': {
        id: 14,
        aggregatorId: 4
    },
    'Pub. - Sent. Insolv. Insuficiência de Massa': {
        id: 15,
        aggregatorId: 4
    }
};

const ACT_ID_AGGREGATORS_MAP = {
    1: 2,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 3,
    7: 3,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 4,
    15: 4
};

const ACT_AGGREGATORS = {
    1: 'Insolvências',
    2: 'Substituições',
    3: 'PER-PEAP',
    4: 'Insuf Massa'
};

module.exports = {
    PEOPLE_TYPES,
    DB_PEOPLE_TYPE_IDS,
    ACTS,
    ACT_ID_AGGREGATORS_MAP,
    ACT_AGGREGATORS
};