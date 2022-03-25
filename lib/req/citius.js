const fetch = require('node-fetch');
const { extractAuthData } = require('../parser/auth-data');
const { fetchDocsByDateAndAct } = require('../req/docs');
const { getDatesByInterval } = require('../tools/date-helper');
const { getCitiusUrl } = require('../req/url');

function doFetch(initialDate, finalDate, actsList) {
    return fetch(getCitiusUrl())
        .then(async function (resp) {
            const response = await resp.text();
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