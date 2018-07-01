const PEOPLE_TYPES = {
    UNKNOWN: 'UNKNOWN',
    DEVEDOR: 'DEVEDOR',
    ADMINISTRADOR_INSOLVENCIA: 'ADMINISTRADOR_INSOLVENCIA',
    CREDOR: 'CREDOR',
    INSOLVENTE: 'INSOLVENTE',
    REQUERENTE: 'REQUERENTE'
};

const DB_PEOPLE_TYPE_IDS = {
    ADMINISTRADOR_INSOLVENCIA: 1,
    INSOLVENTE: 2,
    CREDOR: 3,
    DEVEDOR: 4,
    UNKNOWN: 5,
    REQUERENTE: 6
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
    },
    'Ato: Anúncio sent Insolvência c/ Ass.Cred. - P Citius': {
        id: 16,
        aggregatorId: 1
    },
    'Ato: Anúncio sent Insolvência s/ Ass. Cred. - P Citius': {
        id: 17,
        aggregatorId: 1
    },
    'Ato: Anúncio sent Insolvência s/ Ass.Cred - P Citius': {
        id: 18,
        aggregatorId: 1
    },
    'Ato: Anúncio sent Insolvência s/ Ass.Cred. - P Citius': {
        id: 19,
        aggregatorId: 1
    },
    'Ato: Pub. - Sentença Declaração Insolvência': {
        id: 20,
        aggregatorId: 1
    },
    'Ato: Anúncio - destituição e nomeação - Portal Citius': {
        id: 26,
        aggregatorId: 2
    },
    'Ato: Anúncio destituição e nomeação - Portal Citius': {
        id: 27,
        aggregatorId: 2
    },
    'Ato: Pub. - Destituição / Nomeação Administrador': {
        id: 28,
        aggregatorId: 2
    },
    'Ato: Anúncio PER - artº 34 - P Citius': {
        id: 32,
        aggregatorId: 3
    },
    'Ato: Anúncio sentença (PER) - Portal Citius': {
        id: 33,
        aggregatorId: 3
    },
    'Ato: Pub. - Nomeação Administrador Provisório': {
        id: 34,
        aggregatorId: 3
    },
    'Ato: Anúncio PEAP - artº 34 - P Citius': {
        id: 35,
        aggregatorId: 3
    },
    'Ato: Anúncio sent Insolvência Insuf Massa - P Citius': {
        id: 38,
        aggregatorId: 4
    },
    'Ato: Pub. - Sent. Insolv. Insuficiência de Massa': {
        id: 39,
        aggregatorId: 4
    },
    'Ato: Anúncio sent Insolvência c/ Ass.Cred - P Citius': {
        id: 42,
        aggregatorId: 1
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
    15: 4,
    16: 1,
    17: 1,
    18: 1,
    19: 1,
    20: 1,
    26: 2,
    27: 2,
    28: 2,
    32: 3,
    33: 3,
    34: 3,
    35: 3,
    38: 4,
    39: 4,
    42: 1
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