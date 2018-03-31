const rp = require('request-promise');
const { extractAuthData } = require('../parser/auth-data');
const { fetchDocsByDateAndAct } = require('../req/docs');
const { getDatesByInterval } = require('../tools/date-helper');

function doFetch(initialDate, finalDate, actsList) {
    const options = {
        method: 'GET',
        url: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx'
    };

    return rp(options)
        .then(function (response) {
            const authData = extractAuthData(response);
            const datesList = getDatesByInterval(initialDate, finalDate);
            const promiseList = datesList.reduce((acc, date) => {
                actsList.forEach(act => {
                    acc.push(fetchDocsByDateAndAct(date, date, authData, act));
                });

                return acc;
            }, []);

            return Promise.all(promiseList);
        })
        .catch(function (err) {
            console.error('Auth Error', err);
        });
}

module.exports = {
    doFetch
};