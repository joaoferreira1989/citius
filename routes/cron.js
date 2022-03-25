const cron = require('node-cron');
const fetch = require('node-fetch');

// Every day at 20:40
function startDailyCron1() {
    cron.schedule('24 20 * * *', function () {
        return fetch(new URL('/importer?aggr=inso&range=daily', 'http://80.211.173.129:5225'));
    });
}

function startDailyCron2() {
    cron.schedule('26 20 * * *', function () {
        return fetch(new URL('/importer?aggr=sub&range=daily', 'http://80.211.173.129:5225'));
    });
}

function startDailyCron3() {
    cron.schedule('28 20 * * *', function () {
        return fetch(new URL('/importer?aggr=per&range=daily', 'http://80.211.173.129:5225'));
    });
}

function startDailyCron4() {
    cron.schedule('30 20 * * *', function () {
        return fetch(new URL('/importer?aggr=insu&range=daily', 'http://80.211.173.129:5225'));
    });
}

// Every Sunday at 08:10
function startWeeklyCron1() {
    cron.schedule('10 8 * * 0', function () {
        return fetch(new URL('/importer?aggr=inso&range=weekly', 'http://80.211.173.129:5225'));
    });
}

function startWeeklyCron2() {
    cron.schedule('20 8 * * 0', function () {
        return fetch(new URL('/importer?aggr=sub&range=weekly', 'http://80.211.173.129:5225'));
    });
}

function startWeeklyCron3() {
    cron.schedule('30 8 * * 0', function () {
        return fetch(new URL('/importer?aggr=per&range=weekly', 'http://80.211.173.129:5225'));
    });
}

function startWeeklyCron4() {
    cron.schedule('40 8 * * 0', function () {
        return fetch(new URL('/importer?aggr=insu&range=weekly', 'http://80.211.173.129:5225'));
    });
}

// Every day 1 of every Month at 01:00
function startMonthlyCron1() {
    cron.schedule('0 1 1 * *', function () {
        return fetch(new URL('/importer?aggr=inso&range=monthly&lastday=30', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron2() {
    cron.schedule('0 1 1 * *', function () {
        return fetch(new URL('/importer?aggr=sub&range=monthly&lastday=30', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron3() {
    cron.schedule('0 1 1 * *', function () {
        return fetch(new URL('/importer?aggr=per&range=monthly&lastday=30', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron4() {
    cron.schedule('0 1 1 * *', function () {
        return fetch(new URL('/importer?aggr=insu&range=monthly&lastday=30', 'http://80.211.173.129:5225'));
    });
}

// Every day 1 of every Month at 02:00
function startMonthlyCron5() {
    cron.schedule('0 2 1 * *', function () {
        return fetch(new URL('/importer?aggr=inso&range=monthly&lastday=180', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron6() {
    cron.schedule('0 2 1 * *', function () {
        return fetch(new URL('/importer?aggr=sub&range=monthly&lastday=180', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron7() {
    cron.schedule('0 2 1 * *', function () {
        return fetch(new URL('/importer?aggr=per&range=monthly&lastday=180', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron8() {
    cron.schedule('0 2 1 * *', function () {
        return fetch(new URL('/importer?aggr=insu&range=monthly&lastday=180', 'http://80.211.173.129:5225'));
    });
}

// Every day 1 of every Month at 03:00
function startMonthlyCron9() {
    cron.schedule('0 3 1 * *', function () {
        return fetch(new URL('/importer?aggr=inso&range=monthly&lastday=300', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron10() {
    cron.schedule('0 3 1 * *', function () {
        return fetch(new URL('/importer?aggr=sub&range=monthly&lastday=300', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron11() {
    cron.schedule('0 3 1 * *', function () {
        return fetch(new URL('/importer?aggr=per&range=monthly&lastday=300', 'http://80.211.173.129:5225'));
    });
}

function startMonthlyCron12() {
    cron.schedule('0 3 1 * *', function () {
        return fetch(new URL('/importer?aggr=insu&range=monthly&lastday=300', 'http://80.211.173.129:5225'));
    });
}

module.exports = {
    startDailyCron1,
    startDailyCron2,
    startDailyCron3,
    startDailyCron4,
    startWeeklyCron1,
    startWeeklyCron2,
    startWeeklyCron3,
    startWeeklyCron4,
    startMonthlyCron1,
    startMonthlyCron2,
    startMonthlyCron3,
    startMonthlyCron4,
    startMonthlyCron5,
    startMonthlyCron6,
    startMonthlyCron7,
    startMonthlyCron8,
    startMonthlyCron9,
    startMonthlyCron10,
    startMonthlyCron11,
    startMonthlyCron12
};
