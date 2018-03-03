const rp = require('request-promise');
const { extractAuthData } = require('../parser/auth-data');
const { fetchDocsByDate } = require('../req/docs');
const { getDatesByInterval } = require('../tools/date-helper');

function doFetch(initialDate, finalDate) {
    const options = {
        method: 'GET',
        url: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx'
    };

    return rp(options)
        .then(function (response) {
            const authData = extractAuthData(response);
            const datesList = getDatesByInterval(initialDate, finalDate);
            const promiseList = datesList.map((date) => {
                return fetchDocsByDate(date, date, authData);
            });

            return Promise.all(promiseList);
        })
        .catch(function (err) {
            console.error('Auth Error', err);
        });
}

module.exports = {
    doFetch
};