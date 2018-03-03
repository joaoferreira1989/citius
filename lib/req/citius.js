const rp = require('request-promise');
const { extractAuthData } = require('../parser/auth-data');
const { fetchDocsByDate } = require('../req/docs');

function doFetch(initialDate, finalDate) {
    const options = {
        method: 'GET',
        url: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx'
    };

    return rp(options)
        .then(function (response) {
            const authData = extractAuthData(response);

            return fetchDocsByDate(initialDate, finalDate, authData);
        })
        .catch(function (err) {
            console.error('Auth Error', err);
        });
}

module.exports = {
    doFetch
};