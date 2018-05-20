const cron = require('node-cron');

function startDailyCron() {
    cron.schedule('0 19 * * *', function () {
        console.log('diariamente as 19h');
    });
}

function startWeeklyCron() {
    cron.schedule('0 21 * * 0-7', function () {
        console.log('semanalmente as 21h');
    });
}