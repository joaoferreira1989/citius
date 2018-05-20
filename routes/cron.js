const cron = require('node-cron');

function startDailyCron() {
    cron.schedule('10 19 * * *', function () {
        console.log('diariamente as 19:10');
    });
}

function startWeeklyCron() {
    cron.schedule('10 21 * * 0-7', function () {
        console.log('semanalmente as 21:10');
    });
}

module.exports = {
    startDailyCron,
    startWeeklyCron
};