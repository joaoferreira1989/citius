const cron = require('node-cron');
const rp = require('request-promise');

// Every day at 20:40
function startDailyCron1() {
    cron.schedule('5 20 * * *', function () {
console.log('schedule1');
        return rp({
            method: 'GET',
            url: 'http://127.0.0.1:3000/importer?aggr=inso&range=daily'
        });
    });
}

function startDailyCron2() {
    cron.schedule('07 20 * * *', function () {
console.log('schedule2');
        return rp({
            method: 'GET',
            url: 'http://80.211.173.129:3000/importer?aggr=sub&range=daily'
        });
    });
}

function startDailyCron3() {
    cron.schedule('08 20 * * *', function () {
        return rp({
            method: 'GET',
            url: 'http://localhost:3000/importer?aggr=per&range=daily'
        });
    });
}

function startDailyCron4() {
    cron.schedule('10 20 * * *', function () {
        return rp({
            method: 'GET',
            url: 'http://localhost:3000/importer?aggr=insu&range=daily'
        });
    });
}

// Every Sunday at 08:10
function startWeeklyCron1() {
    cron.schedule('10 8 * * 0', function () {
        return rp({
            method: 'GET',
            url: 'http://localhost:3000/importer?aggr=inso&range=weekly'
        });
    });
}

function startWeeklyCron2() {
    cron.schedule('20 8 * * 0', function () {
        return rp({
            method: 'GET',
            url: 'http://localhost:3000/importer?aggr=sub&range=weekly'
        });
    });
}

function startWeeklyCron3() {
    cron.schedule('30 8 * * 0', function () {
        return rp({
            method: 'GET',
            url: 'http://localhost:3000/importer?aggr=per&range=weekly'
        });
    });
}

function startWeeklyCron4() {
    cron.schedule('40 8 * * 0', function () {
        return rp({
            method: 'GET',
            url: 'http://localhost:3000/importer?aggr=insu&range=weekly'
        });
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
    startWeeklyCron4
};
