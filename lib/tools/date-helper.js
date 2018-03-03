const moment = require('moment');

function getDatesByInterval(startDate, endDate) {
    const dateArray = [];
    let currentDate = moment(startDate, 'DD-MM-YYYY');
    let stopDate = moment(endDate, 'DD-MM-YYYY');

    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format('DD-MM-YYYY'));
        currentDate = moment(currentDate).add(1, 'days');
    }

    return dateArray;
}

module.exports = {
    getDatesByInterval
}